import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add connection error handling
let firestoreConnected = true;

// Try to detect connection issues and fallback
const checkFirestoreConnection = async () => {
  try {
    await enableNetwork(db);
    firestoreConnected = true;
  } catch (error) {
    console.warn('Firestore connection issues detected, using offline mode:', error);
    firestoreConnected = false;
    try {
      await disableNetwork(db);
    } catch (disableError) {
      console.warn('Could not disable network:', disableError);
    }
  }
};

checkFirestoreConnection();

export { firestoreConnected };
export default app;