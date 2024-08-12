// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeki_Jp2Xu3g6AYf2sTsFAVbcafFxa5Lk",
  authDomain: "todolistreact-c44b1.firebaseapp.com",
  databaseURL: "https://todolistreact-c44b1-default-rtdb.firebaseio.com",
  projectId: "todolistreact-c44b1",
  storageBucket: "todolistreact-c44b1.appspot.com",
  messagingSenderId: "351409272851",
  appId: "1:351409272851:web:0bc3a27c2793b960aae7e6",
  measurementId: "G-906BX7T620"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Export the initialized Firebase app and auth
export const auth = getAuth(app);
