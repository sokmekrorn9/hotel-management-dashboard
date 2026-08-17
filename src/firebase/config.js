import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTZUzI1AUytRSmHRJ2kRRWX_Ze-4n6eyU",
  authDomain: "my-hms-app.firebaseapp.com",
  projectId: "my-hms-app",
  storageBucket: "my-hms-app.firebasestorage.app",
  messagingSenderId: "97817782092",
  appId: "1:97817782092:web:871e2a527a7bb7d17a51e9",
  measurementId: "G-DERNDFSE66",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
