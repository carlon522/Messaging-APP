// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDnCceoPkxneEN_GO4fSUgIVSq0fzRaGs",
    authDomain: "testapp-e41d5.firebaseapp.com",
    projectId: "testapp-e41d5",
    storageBucket: "testapp-e41d5.appspot.com",
    messagingSenderId: "905132711526",
    appId: "1:905132711526:web:245898bf2ba7e41c3217a7"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, app };

