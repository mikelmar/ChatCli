// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import {getStorage} from "firebase/storage";
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyBqzQgm642BDNTUekGwOB45ajnPOTUyC9M",
  authDomain: "bbbb-8b224.firebaseapp.com",
  projectId: "bbbb-8b224",
  storageBucket: "bbbb-8b224.appspot.com",
  messagingSenderId: "812158004027",
  appId: "1:812158004027:web:481add713926d0790de51e",
  measurementId: "G-8GQ20EJF9Y"
};*/

const app = firebase.initializeApp({
  "projectId": "bbbb-8b224",
  "appId": "1:812158004027:web:f269fdb7b4e1c28c0de51e",
  "storageBucket": "bbbb-8b224.appspot.com",
  "locationId": "europe-west",
  "apiKey": "AIzaSyBqzQgm642BDNTUekGwOB45ajnPOTUyC9M",
  "authDomain": "bbbb-8b224.firebaseapp.com",
  "messagingSenderId": "812158004027",
  "measurementId": "G-J95LDBCVH0"
});

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {app};