import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";     
   

const firebaseConfig = {
  apiKey: "AIzaSyAMsPs9Mi5qSwGjOQJmn-QyvQ9e_kG-KIw",
  authDomain: "snap-mart-682ce.firebaseapp.com",
  databaseURL: "https://snap-mart-682ce-default-rtdb.firebaseio.com",
  projectId: "snap-mart-682ce",
  storageBucket: "snap-mart-682ce.firebasestorage.app",
  messagingSenderId: "914723990578",
  appId: "1:914723990578:web:2f0b36e22c29ea253f602b"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
