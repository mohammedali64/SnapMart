import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartFetch, incrementQuantity, removeFromCart } from '../store/Slices/cartSlice';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Cart = () => {
  const dispatch = useDispatch();
  const { authVerify } = useAuth();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      dispatch(cartFetch());
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!auth.currentUser) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.itemQuantity), 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    const updatedItem = {
      ...item,
      itemQuantity: item.itemQuantity + 1,
    }
    dispatch(incrementQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    const updatedItem = {
      ...item,
      itemQuantity: item.itemQuantity - 1,
    }
    dispatch(incrementQuantity(updatedItem));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const checkoutHandler = async () => {
    const user = await authVerify();  
    navigate("/checkout");
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className='flex flex-row justify-between'>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ">Shopping Cart</h1>
      <button onClick={()=>navigate("/")} className='hover:text-red-700 hover:underline cursor-pointer   mb-6'>Continue Shopping</button>
      </div>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 text-sm font-medium text-gray-700 bg-gray-100 p-4">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Actions</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-5 items-center p-4 border-b">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/50x50'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-gray-900">{item.name}</span>
                </div>
                <span className="text-gray-900">${item.price}</span>
                <div className="flex items-center space-x-2">
                  {item.itemQuantity > 1 && <button
                    onClick={() => handleDecrement(item)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>}
                  <span className="text-gray-900">{item.itemQuantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-900">${(item.price * item.itemQuantity).toFixed(2)}</span>
                <div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="mt-2 text-red-500 hover:text-red-700 block text-center w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gray-900">${getTotalPrice()}</span>
                </div>
                <button onClick={checkoutHandler} className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;