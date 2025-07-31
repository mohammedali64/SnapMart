import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../Store/Slices/categorySlice';
import ShowCategory from './CategoryCard';
import CategoryCard from './CategoryCard';

const Category = () => {
  const dispatch = useDispatch();
  const [name,setName] = useState('');
  const [url,setUrl] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const categories = useSelector((state)=>state.categories.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = { name, url };
    setIsFormOpen(false);
    const response = await dispatch(addCategory(category));
    console.log(response.payload);
    setName('');
    setUrl(''); 
  };

  

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold mb-6"
        >
          Add Category
        </button>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Category</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Category Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input
                  type="url"
                  name="imageUrl"
                  value={url}
                  onChange={(e)=>setUrl(e.target.value)}
                  placeholder="Image URL"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={()=>handleCloseForm()}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
      {categories.map((category)=>(
        <CategoryCard key={category.id} category={category}/>
      ))}
      </div>
    </div>
  );
};

export default Category;