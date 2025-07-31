import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { deleteGuestCart, fetchCart, setCart } from "../Services/cartApiServices";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mergeGuestCartWithUserCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guestCart.length === 0) return;

    const userCart = await fetchCart(); 
    const merged = [...userCart];

    guestCart.forEach((guestItem) => {
      const index = merged.findIndex((item) => item.name === guestItem.name);
      if (index !== -1) {
        merged[index].itemQuantity += guestItem.itemQuantity;
      } else {
        merged.push(guestItem);
      }
    });

    await setCart(merged);
    await deleteGuestCart();
    localStorage.removeItem("guestCart");
  };

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await mergeGuestCartWithUserCart();
      return userCredential.user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await mergeGuestCartWithUserCart();
      return userCredential.user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const authVerify = () => {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  return { signup, signin, logout, loading, error, authVerify };
};
