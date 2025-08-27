
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "finstart-hanpm",
  "appId": "1:695566034075:web:62ecbdeb497a7f5b90123e",
  "storageBucket": "finstart-hanpm.appspot.com",
  "apiKey": "AIzaSyDvUWynB3j6ouA0A8EuIfILjQ8gAKvNDGk",
  "authDomain": "finstart-hanpm.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "695566034075"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
