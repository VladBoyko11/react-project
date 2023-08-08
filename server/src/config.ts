// Import the functions you need from the SDKs you need

import firebase, {FirebaseOptions, initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCZ8bDhxR4OmnpgppOKgSTLwPxNhNgiyqo",
  authDomain: "app-store-f78c2.firebaseapp.com",
  projectId: "app-store-f78c2",
  storageBucket: "app-store-f78c2.appspot.com",
  messagingSenderId: "244003667626",
  appId: "1:244003667626:web:5fd8281f0c46cf37299ad3",
  measurementId: "G-HWT8JP2LMW"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
export default app