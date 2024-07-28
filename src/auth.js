// src/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, db } from './firebase'; // Import the initialized app and firestore from firebase.js

const auth = getAuth(app);

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export { signUp, logIn, logOut, signInWithGoogle, auth, db };