import { getDatabase, onValue, ref } from "firebase/database";

export const fetchAllOrders = async () => {
  const response = await fetch(
    `https://snap-mart-682ce-default-rtdb.firebaseio.com/orders.json`
  );
  const data = await response.json();
  if (!data) return [];

  return Object.entries(data).flatMap(([uid, userOrders]) =>
    Object.entries(userOrders).map(([orderId, order]) => {
      const items = Object.keys(order)
        .filter((key) => !isNaN(key))
        .map((key) => order[key]);

      return {
        id: orderId,
        userId: uid,
        items,
        createdAt: order.createdAt,
        paymentMethod: order.paymentMethod,
        status: order.status || "pending",
        total: items.reduce((sum, item) => sum + item.price * item.itemQuantity, 0),
      };
    })
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const updateOrderStatus = async (userId, orderId, newStatus) => {
  await fetch(
    `https://snap-mart-682ce-default-rtdb.firebaseio.com/orders/${userId}/${orderId}/status.json`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    }
  );
};

export const subscribeToAllOrders = (callback) => {
  const db = getDatabase();
  const ordersRef = ref(db, "orders");

  onValue(ordersRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }

    const formattedOrders = Object.entries(data).flatMap(([uid, userOrders]) =>
      Object.entries(userOrders).map(([orderId, order]) => {
        const items = Object.keys(order)
          .filter((key) => !isNaN(key))
          .map((key) => order[key]);

        return {
          id: orderId,
          userId: uid,
          items,
          createdAt: order.createdAt,
          paymentMethod: order.paymentMethod,
          status: order.status || "pending",
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      })
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    callback(formattedOrders);
  });
};

