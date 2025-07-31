import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/Slices/categorySlice';
import { fetchProducts } from '../store/Slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.items);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchProducts());
  }, []);

  const handleCategoryUpdate = (name)=>{
    navigate(`/categories/${name}`);
  }

  const handleProduct = (id)=>{
    navigate(`/products/${id}`);
  }

  console.log(categories);
  console.log(products); 
  console.log(categoryName);
  const updatedCategoryProducts = products.filter((product) => product.category === categoryName);
  console.log(updatedCategoryProducts);

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <div className="pt-10 px-5 border-b-[0.5px] border-gray-300 fixed min-w-screen bg-gray-100">
        <div className="flex flex-wrap justify-start space-x-6 px-4">
          {categories.map((category, index) => (
            <span key={index} onClick={()=>handleCategoryUpdate(category.name)} className={`text-md  text-gray-800 mb-4 cursor-pointer ${categoryName === category.name?'font-bold underline':'font-normal'}`}>
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-24">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Products in {categoryName}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {updatedCategoryProducts.map((product, index) => (
            <div key={index} className="bg-gray-100 hover:shadow-md rounded-lg overflow-hidden">
              <div onClick={()=>handleProduct(product.id)} className="h-48 bg-gray-300 flex items-center justify-center">
                <img src={product.imageUrl || 'https://via.placeholder.com/200x200'} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                <p className='text-md'>{product.description}</p>
                <p className='font-serif mt-8'>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;