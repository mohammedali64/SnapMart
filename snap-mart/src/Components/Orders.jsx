import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistoryDelete, ordersFetch } from '../store/Slices/orderSlice';
import { auth } from '../firebaseConfig';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(ordersFetch());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleOrderHistory = (id)=>{
    dispatch(orderHistoryDelete(id));
  }

  if (loading) return <div className="mt-16 text-center text-gray-600">Loading...</div>;
  if (error) return <div className="mt-16 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">
                  Order #{order.id}
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">Items</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-2">
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
                  ))}
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">Order Details</h3>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                  <button onClick={()=>handleOrderHistory(order.id)} className="mt-4 w-full md:w-auto bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Remover Order History
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
