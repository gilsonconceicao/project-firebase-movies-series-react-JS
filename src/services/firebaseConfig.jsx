// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8pfrBO2MhqZmVx1-KjpU44IftrVHvoEQ",
  authDomain: "miniblogreact-463b6.firebaseapp.com",
  projectId: "miniblogreact-463b6",
  storageBucket: "miniblogreact-463b6.appspot.com",
  messagingSenderId: "596144701167",
  appId: "1:596144701167:web:4e22d86a59705db8e5e51a",
  measurementId: "G-6CTH3CEV16"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
