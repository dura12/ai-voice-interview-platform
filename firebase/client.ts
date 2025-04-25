
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBU-b21-4xzbe5n_JBHIv_59cCd2N0xc74",
  authDomain: "alrec-9328a.firebaseapp.com",
  projectId: "alrec-9328a",
  storageBucket: "alrec-9328a.firebasestorage.app",
  messagingSenderId: "689131806893",
  appId: "1:689131806893:web:1c4d3d79d9c8ab28b3e624",
  measurementId: "G-LBXZR7J1X8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
// Initialize Firebase
