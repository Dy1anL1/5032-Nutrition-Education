import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userProfile = ref(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userProfile.value?.role === 'admin')
  const isUser = computed(() => userProfile.value?.role === 'user')

  const initializeAuth = () => {
    // Set a fallback timeout to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      if (loading.value) {
        console.warn('Auth initialization timeout, setting loading to false')
        loading.value = false
      }
    }, 5000)
    
    onAuthStateChanged(auth, async (firebaseUser) => {
      clearTimeout(fallbackTimeout)
      
      try {
        if (firebaseUser) {
          user.value = firebaseUser
          await loadUserProfile(firebaseUser.uid)
        } else {
          user.value = null
          userProfile.value = null
          // Clear any cached profiles when user logs out
          localStorage.removeItem(`userProfile_${user.value?.uid}`)
        }
      } catch (error) {
        console.error('Error in auth state change:', error)
      } finally {
        loading.value = false
      }
    })
  }

  const loadUserProfile = async (uid) => {
    // First check localStorage cache for faster loading
    const cachedProfile = localStorage.getItem(`userProfile_${uid}`)
    if (cachedProfile) {
      try {
        userProfile.value = JSON.parse(cachedProfile)
        console.log('Loaded user profile from cache')
      } catch (e) {
        console.warn('Failed to parse cached profile')
      }
    }
    
    // Try to load from Firestore with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firestore timeout')), 5000)
    )
    
    try {
      const userDocPromise = getDoc(doc(db, 'users', uid))
      const userDoc = await Promise.race([userDocPromise, timeoutPromise])
      
      if (userDoc.exists()) {
        const profileData = userDoc.data()
        userProfile.value = profileData
        // Cache the profile locally
        localStorage.setItem(`userProfile_${uid}`, JSON.stringify(profileData))
        console.log('Loaded user profile from Firestore and cached')
      } else if (!cachedProfile) {
        // Only create default if no cache exists
        console.log('No user profile found, creating default profile')
        const defaultProfile = {
          name: user.value?.displayName || 'User',
          email: user.value?.email || '',
          role: 'user',
          createdAt: new Date().toISOString()
        }
        userProfile.value = defaultProfile
        localStorage.setItem(`userProfile_${uid}`, JSON.stringify(defaultProfile))
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
      
      // Use cache if available, otherwise create fallback
      if (!cachedProfile) {
        const fallbackProfile = {
          name: user.value?.displayName || 'User',
          email: user.value?.email || '',
          role: 'user',
          createdAt: new Date().toISOString()
        }
        userProfile.value = fallbackProfile
        localStorage.setItem(`userProfile_${uid}`, JSON.stringify(fallbackProfile))
        console.log('Using fallback profile due to Firestore error')
      }
    }
  }

  const register = async (email, password, name, role = 'user') => {
    try {
      console.log('Creating Firebase user with email:', email)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('User created:', userCredential.user.uid)
      
      console.log('Updating profile with name:', name)
      await updateProfile(userCredential.user, { displayName: name })
      
      const profileData = {
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      }
      
      // Immediately update the user state for fast UI response
      user.value = userCredential.user
      userProfile.value = profileData
      loading.value = false
      
      // Cache profile locally first
      localStorage.setItem(`userProfile_${userCredential.user.uid}`, JSON.stringify(profileData))
      console.log('User profile cached locally for fast access')
      
      // Try to save to Firestore in background (with timeout)
      try {
        const savePromise = setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          role,
          createdAt: new Date()
        })
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firestore save timeout')), 5000)
        )
        
        await Promise.race([savePromise, timeoutPromise])
        console.log('User profile saved to Firestore successfully')
      } catch (firestoreError) {
        console.warn('Failed to save to Firestore, but profile is cached locally:', firestoreError)
        // Registration still succeeds even if Firestore fails
      }
      
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      
      // Immediately load user profile for faster UI updates
      await loadUserProfile(userCredential.user.uid)
      loading.value = false
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const promoteToAdmin = async () => {
    if (!user.value) return { success: false, error: 'No user logged in' }
    
    try {
      const updatedProfile = {
        ...userProfile.value,
        name: userProfile.value?.name || user.value.displayName || 'User',
        email: user.value.email,
        role: 'admin',
        createdAt: userProfile.value?.createdAt || new Date().toISOString()
      }
      
      // Update local state immediately
      userProfile.value = updatedProfile
      
      // Update cache immediately
      localStorage.setItem(`userProfile_${user.value.uid}`, JSON.stringify(updatedProfile))
      console.log('User promoted to admin locally and cached')
      
      // Try to update Firestore with timeout
      try {
        const updatePromise = setDoc(doc(db, 'users', user.value.uid), {
          name: updatedProfile.name,
          email: updatedProfile.email,
          role: 'admin',
          createdAt: new Date(updatedProfile.createdAt)
        })
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firestore update timeout')), 5000)
        )
        
        await Promise.race([updatePromise, timeoutPromise])
        console.log('Admin role updated in Firestore successfully')
      } catch (firestoreError) {
        console.warn('Failed to update Firestore, but role is cached locally:', firestoreError)
        // Promotion still succeeds even if Firestore fails
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error promoting to admin:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    userProfile,
    loading,
    isAuthenticated,
    isAdmin,
    isUser,
    initializeAuth,
    register,
    login,
    logout,
    promoteToAdmin
  }
})