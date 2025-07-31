import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/Slices/productSlice';
import { getCategories, selectCategory } from '../store/Slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.items);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleShowCategory = (name)=>{
    navigate(`/categories/${name}`);
    dispatch(selectCategory(name))
  }

  console.log(categories);

  return (
    <div className="min-h-screen bg-gray-100 mt-16">  
      <div className="py-12">
        <h2 className="text-center text-2xl font-light text-gray-700 mb-8">Choose a department</h2>
        <div className="flex flex-wrap justify-center space-x-6">
          {categories.map((category, index) => (
            <div key={index} onClick={()=>handleShowCategory(category.name)} className="relative w-1/3 h-48 bg-cover bg-center mb-6" style={{ backgroundImage: `url('${category.url}')`, }}>
              <div className="absolute inset-0 flex items-center justify-center ">
                <span className="text-white text-3xl font-bold text-stroke">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;