import { auth } from "../firebaseConfig";

export const placeOrder = async (orderData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const res = await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/orders/${uid}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "processing",
    })
  });

  const data = await res.json();
  return { orderId: data.name, ...orderData };
};

export const fetchOrders = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const response = await fetch(
    `https://snap-mart-682ce-default-rtdb.firebaseio.com/orders/${user.uid}.json`
  );
  const data = await response.json();

  if (!data) return [];

  return Object.keys(data).map((orderId) => {
    const order = data[orderId];

    const items = Object.keys(order)
      .filter((key) => !isNaN(key))
      .map((key) => order[key]);

    return {
      id: orderId,
      items,
      createdAt: order.createdAt,
      paymentMethod: order.paymentMethod,
      status: order.status || "pending",
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
};

export const deleteOrderHistory = async(id)=>{
    const user = auth.currentUser;
    if (!user) return [];
    const uid = user.uid;
    await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/orders/${uid}/${id}.json`,{
        method:"DELETE",
    })
}
