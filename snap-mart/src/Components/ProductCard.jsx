import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/Slices/categorySlice';
import { fetchProducts } from '../store/Slices/productSlice';
import { useParams } from 'react-router-dom';
import { addCart, cartFetch } from '../store/Slices/cartSlice';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useSelector((state) => state.product.items);
  const cart = useSelector((state) => state.cart.cart);
  const productDetails = products.find((product) => product.id === productId);

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchProducts());
    dispatch(cartFetch());
  }, [dispatch]);

  if (!productDetails) {
    return <div className="mt-16 text-center text-gray-600">Product not found</div>;
  }

  const handleAddtoCart = async (product) => {
    setAdding(true);
    await dispatch(addCart(product));
    setAdding(false);
  };

  const isInCart = cart.some((product) => product.name === productDetails.name);
  const isDisabled = isInCart || adding;

  return (
    <div className="mt-16 bg-gray-100 max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={productDetails.imageUrl || 'https://via.placeholder.com/500x500'}
            alt={productDetails.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{productDetails.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{productDetails.description || 'No description available'}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">${productDetails.price || '0.00'}</p>
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-medium">Category:</span> {productDetails.category || 'Unknown'}</p>
              <p className="text-gray-700"><span className="font-medium">Availability:</span> In Stock</p>
            </div>
          </div>
          <button
            onClick={() => handleAddtoCart(productDetails)}
            disabled={isDisabled}
            className="mt-6 w-full lg:w-auto bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? "Loading..." : isInCart ? "This Item is in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
