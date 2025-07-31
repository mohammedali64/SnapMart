import { getCartPath } from "./getCartPath";

export const addToCart = async (product) => {
  const path = getCartPath();
  const res = await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  const data = await res.json();
  const updatedData = { ...product, id: data.name, itemQuantity: 1 };

  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}/${data.name}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });

  return updatedData;
};

export const fetchCart = async () => {
  const path = getCartPath();
  const response = await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}.json`);
  const data = await response.json();
  return data ? Object.values(data) : [];
};

export const increment = async (item) => {
  const path = getCartPath();
  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}/${item.id}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return item;
};

export const deleteItem = async (item) => {
  const path = getCartPath();
  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}/${item.id}.json`, {
    method: 'DELETE'
  });
  return item;
};

export const deleteGuestCart = async()=>{
    await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/cart/guest.json`,{
        method:'DELETE'
    })
}

export const setCart = async (cartItems) => {
  const path = getCartPath();
  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      cartItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {})
    )
  });
};

export const deleteUserCart = ()=>{
  const path = getCartPath();
  fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/${path}.json`,{
    method:'DELETE'
  })
}

