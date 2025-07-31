import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartFetch, userCartDelete } from '../store/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { orderPlace } from '../store/Slices/orderSlice';
import { fetchOrders } from '../Services/orderApiServices';

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  

  useEffect(()=>{
    dispatch(cartFetch());
  },[dispatch]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.itemQuantity), 0).toFixed(2);
  };

  const handleOrder = () => {
    setIsModalOpen(true);
    const user = auth.currentUser;
    console.log(user.uid);
  };

  const handlePaymentChoice = async(choice) => {
    console.log(`Selected payment method: ${choice}`);
    setIsModalOpen(false);
    const updatedCart = {
      ...cart,
      paymentMethod: choice
    }
    dispatch(orderPlace(updatedCart));
    dispatch(userCartDelete());
    const data = await fetchOrders();
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className='flex flex-row justify-between'>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <button onClick={()=>navigate("/")} className='hover:text-red-700 hover:underline cursor-pointer   mb-6'>Continue Shopping</button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/50x50'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-gray-600 text-sm">Qty: {item.itemQuantity}</p>
                  </div>
                </div>
                <p className="text-gray-900">${(item.price * item.itemQuantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900">${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-gray-900">${getTotalPrice()}</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleOrder}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Payment Method</h2>
            <div className="space-y-4">
              <button
                onClick={() => handlePaymentChoice('Cash on Delivery')}
                className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => handlePaymentChoice('Online Payment')}
                className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Online Payment
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;