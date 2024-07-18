import {initializeApp} from "firebase/app";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-ZZum97yWQHsMlZq4PIeZ7FqlUKH8HE4",
  authDomain: "delatte-2024.firebaseapp.com",
  projectId: "delatte-2024",
  storageBucket: "delatte-2024.appspot.com",
  messagingSenderId: "662545444720",
  appId: "1:662545444720:web:2b5734d4540ade078d69b5",
  measurementId: "G-74PG4WT32F"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  
  export {app, auth, googleProvider, facebookProvider};