import { db } from "../firebase";
import { ref, get, set, remove, push } from "firebase/database";

export const addProduct = async (data) => {
  const res = await fetch('https://snap-mart-682ce-default-rtdb.firebaseio.com/allProducts.json',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const response = await res.json();
  const updatedData = {...data,id:response.name};
  set(ref(db, 'allProducts/' + response.name), updatedData);
  return updatedData;
};

export const getProducts = async () => {
  const snapshot = await get(ref(db, "allProducts"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const deleteProduct = async(id)=>{
  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/allProducts/${id}.json`,{
    method: 'DELETE',
  })
}

export const addCategories = async(data)=>{
    const res = await fetch('https://snap-mart-682ce-default-rtdb.firebaseio.com/categories.json',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const response = await res.json();
  const updatedData = {...data,id:response.name};
  set(ref(db, 'categories/' + response.name), updatedData);
  console.log(updatedData);
  return updatedData;
}

export const fetchCategories = async()=>{
  const snapshot = await get(ref(db, "categories"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];

}

export const deleteCategori = async(id)=>{
  await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/categories/${id}.json`,{
    method: 'DELETE',
  })
}

