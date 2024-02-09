import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN9i74xGsjU29jf2RFusPXlqYs4wALgSY",
  authDomain: "clone-254f2.firebaseapp.com",
  projectId: "clone-254f2",
  storageBucket: "clone-254f2.appspot.com",
  messagingSenderId: "284220981297",
  appId: "1:284220981297:web:f82a14e642d8c002eb5510",
  measurementId: "G-NC5QMR2P79",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
