// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsIFT2-uDPmY9GEGdkSNc4fRZpmMDaM-4",
  authDomain: "teams-83655.firebaseapp.com",
  projectId: "teams-83655",
  storageBucket: "teams-83655.firebasestorage.app",
  messagingSenderId: "478537557848",
  appId: "1:478537557848:web:c1a076e099539d0e14672d",
  measurementId: "G-9Z82KR1CCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };