// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAekxodcOsirATIgnJH4kqCIxi0evQgyiI",
  authDomain: "technodinamika-10a0f.firebaseapp.com",
  projectId: "technodinamika-10a0f",
  storageBucket: "technodinamika-10a0f.appspot.com",
  messagingSenderId: "847713693852",
  appId: "1:847713693852:web:e87e32ba3122eb3ed8fd59",
  measurementId: "G-D4GBY3SDQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const requestsRef = ref(database, 'заявки');
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth };
export { database };
export { requestsRef };
export { firestore }
export { provider }