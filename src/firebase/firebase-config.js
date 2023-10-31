import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4i_-GvKjR5dem2k82nVEMood2J6zdyq0",

  authDomain: "authentication-tutorial-bdd9b.firebaseapp.com",

  projectId: "authentication-tutorial-bdd9b",

  storageBucket: "authentication-tutorial-bdd9b.appspot.com",

  messagingSenderId: "657143896129",

  appId: "1:657143896129:web:6068c3f460d439ceb04ec0",

  measurementId: "G-4EWQPWVBED",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
}

export const storage =getStorage(app);

export const db = getFirestore(app);
