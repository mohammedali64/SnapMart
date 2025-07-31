import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToAllOrders } from "../Services/orderApiServices";
import { adminUpdateOrderStatus, setOrders } from "../Store/Slices/manageOrderSlice";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const unsubscribe = subscribeToAllOrders((fetchedOrders) => {
      dispatch(setOrders(fetchedOrders));
    });

    return () => unsubscribe;
  }, [dispatch]);

  const handleStatusChange = (order, newStatus) => {
    dispatch(
      adminUpdateOrderStatus({
        userId: order.userId,
        orderId: order.id,
        status: newStatus,
      })
    );
  };

  if (loading) return <div className="mt-16 text-center">Loading...</div>;
  if (error) return <div className="mt-16 text-center text-red-600">{error}</div>;

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.userId]) acc[order.userId] = [];
    acc[order.userId].push(order);
    return acc;
  }, {});

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {Object.keys(groupedOrders).map((userId) => (
        <div
          key={userId}
          className="mb-10 p-6 rounded-lg bg-gray-50 border border-gray-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            User: {userId}
          </h2>

          {groupedOrders[userId].map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.itemQuantity,
              0
            );

            return (
              <div key={order.id} className="bg-white p-4 mb-6 shadow rounded">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-semibold">Order #{order.id}</span>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/50x50"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          Qty: {item.itemQuantity} | Price: ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right font-semibold text-gray-900">
                  Total: ${total.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
