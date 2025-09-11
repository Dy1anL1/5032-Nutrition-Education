import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdd_1HHv_JgaGbrO5hgtjME40JKYAVfEA",
  authDomain: "nutritioneducation-jiaze.firebaseapp.com",
  projectId: "nutritioneducation-jiaze",
  storageBucket: "nutritioneducation-jiaze.firebasestorage.app",
  messagingSenderId: "565365513318",
  appId: "1:565365513318:web:eb7470d020d70aa1e7e1a7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;