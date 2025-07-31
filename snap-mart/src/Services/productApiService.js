export const getAllProducts = async()=>{
    const res = await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/allProducts.json`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json();
    return data ? Object.values(data) : [];
}

export const getAllCategories = async()=>{
    const res = await fetch(`https://snap-mart-682ce-default-rtdb.firebaseio.com/categories.json`,{
        method: 'GET',
    })
    const data = await res.json();
    return data ? Object.values(data) : [];
}