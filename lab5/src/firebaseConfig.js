// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYAJH6DQ8J_7WDqctFgFwB1nBxr0wdJ4g",
  authDomain: "piwo-hotele.firebaseapp.com",
  databaseURL: "https://piwo-hotele-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "piwo-hotele",
  storageBucket: "piwo-hotele.appspot.com",
  messagingSenderId: "251274406985",
  appId: "1:251274406985:web:5dd77927fb8cb92e0ca398"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);