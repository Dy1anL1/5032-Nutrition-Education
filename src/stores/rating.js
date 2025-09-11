import { ref } from 'vue'
import { defineStore } from 'pinia'
import { 
  doc, 
  getDoc, 
  runTransaction
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthStore } from './auth'

export const useRatingStore = defineStore('rating', () => {
  const ratings = ref({})
  const userRatings = ref({})
  
  const authStore = useAuthStore()

  const getRatingStats = (itemId) => {
    const stats = ratings.value[itemId]
    if (!stats) return { averageRating: 0, totalRatings: 0 }
    
    return {
      averageRating: stats.totalScore > 0 ? stats.totalScore / stats.totalRatings : 0,
      totalRatings: stats.totalRatings
    }
  }

  const getUserRating = (itemId) => {
    if (!authStore.user) return 0
    return userRatings.value[`${authStore.user.uid}_${itemId}`] || 0
  }

  const loadRatingStats = async (itemId) => {
    try {
      const ratingDoc = await getDoc(doc(db, 'ratings', itemId))
      if (ratingDoc.exists()) {
        ratings.value[itemId] = ratingDoc.data()
      } else {
        ratings.value[itemId] = { totalScore: 0, totalRatings: 0 }
      }
    } catch (error) {
      console.error('Error loading rating stats:', error)
    }
  }

  const loadUserRating = async (itemId) => {
    if (!authStore.user) return
    
    try {
      const userRatingDoc = await getDoc(
        doc(db, 'userRatings', `${authStore.user.uid}_${itemId}`)
      )
      if (userRatingDoc.exists()) {
        userRatings.value[`${authStore.user.uid}_${itemId}`] = userRatingDoc.data().rating
      }
    } catch (error) {
      console.error('Error loading user rating:', error)
    }
  }

  const submitRating = async (itemId, newRating, itemType = 'recipe') => {
    if (!authStore.user) {
      return { success: false, error: 'Must be logged in to rate' }
    }

    if (newRating < 1 || newRating > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' }
    }

    try {
      await runTransaction(db, async (transaction) => {
        const userRatingRef = doc(db, 'userRatings', `${authStore.user.uid}_${itemId}`)
        const ratingStatsRef = doc(db, 'ratings', itemId)
        
        const userRatingDoc = await transaction.get(userRatingRef)
        const ratingStatsDoc = await transaction.get(ratingStatsRef)
        
        const oldRating = userRatingDoc.exists() ? userRatingDoc.data().rating : 0
        const ratingDiff = newRating - oldRating
        
        // Update user's rating
        transaction.set(userRatingRef, {
          rating: newRating,
          itemId,
          itemType,
          userId: authStore.user.uid,
          updatedAt: new Date().toISOString()
        })
        
        // Update aggregated stats
        if (ratingStatsDoc.exists()) {
          const currentStats = ratingStatsDoc.data()
          const newTotalRatings = oldRating === 0 ? currentStats.totalRatings + 1 : currentStats.totalRatings
          
          transaction.update(ratingStatsRef, {
            totalScore: currentStats.totalScore + ratingDiff,
            totalRatings: newTotalRatings,
            updatedAt: new Date().toISOString()
          })
        } else {
          transaction.set(ratingStatsRef, {
            itemId,
            itemType,
            totalScore: newRating,
            totalRatings: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      })
      
      // Update local state
      userRatings.value[`${authStore.user.uid}_${itemId}`] = newRating
      await loadRatingStats(itemId)
      
      return { success: true }
    } catch (error) {
      console.error('Error submitting rating:', error)
      return { success: false, error: error.message }
    }
  }

  const loadItemData = async (itemId) => {
    await Promise.all([
      loadRatingStats(itemId),
      loadUserRating(itemId)
    ])
  }

  return {
    ratings,
    userRatings,
    getRatingStats,
    getUserRating,
    loadRatingStats,
    loadUserRating,
    submitRating,
    loadItemData
  }
})