// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS5pq5qiv4dde2H_rRaol4AEpclBsxD90",
  authDomain: "wpwater-332ac.firebaseapp.com",
  projectId: "wpwater-332ac",
  storageBucket: "wpwater-332ac.appspot.com",
  messagingSenderId: "864910900635",
  appId: "1:864910900635:web:4530cabbca3c1e705e353e",
  measurementId: "G-T3732N3MHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics }; 