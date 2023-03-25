import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtUu3SPVPj_oOa_VbdAjFHE9nCDLDdhPA",
  authDomain: "tcl-56-smart-shopping-li-ffe7d.firebaseapp.com",
  projectId: "tcl-56-smart-shopping-li-ffe7d",
  storageBucket: "tcl-56-smart-shopping-li-ffe7d.appspot.com",
  messagingSenderId: "780034012004",
  appId: "1:780034012004:web:f9d38848721ba46ee7c071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
