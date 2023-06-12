
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpxHL45zZ-IobtMb6v1-HjSlLked0TQ-U",
  authDomain: "massernger.firebaseapp.com",
  projectId: "massernger",
  storageBucket: "massernger.appspot.com",
  messagingSenderId: "109339748188",
  appId: "1:109339748188:web:bdb7ec1bcb14ab539c8399"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db,app};

export default firebaseConfig;

