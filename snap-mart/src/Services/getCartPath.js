import { auth } from "../firebaseConfig";

export const getCartPath = () => {
  const user = auth.currentUser;
  return user
    ? `cart/users/${user.uid}`
    : `cart/guest`;
};