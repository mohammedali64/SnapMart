import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authVerify = () => {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true); 
        } else {
          resolve(false); // User not logged in
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};