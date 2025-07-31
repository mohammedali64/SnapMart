import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, deleteCategory } from '../Store/Slices/categorySlice';

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [url,setUrl] = useState('');
      const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id)=>{
    dispatch(deleteCategory(id));
  }

  const handleSubmit = async(id)=>{
    handleDelete(id);
    const category = { name, url };
    setIsFormOpen(false);
    const response = await dispatch(addCategory(category));
    console.log(response.payload);
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs">
      <div className="flex flex-col items-center">
        <img
          src={category.url}
          alt={category.name}
          className="w-32 h-32 object-contain border border-gray-200 rounded-md mb-4"
        />
        <p className="text-lg font-semibold text-gray-800 text-center">{category.name}</p>
        <div className="flex gap-2 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => {
              setName(category.name);
              setUrl(category.url);
              setIsFormOpen(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={()=>handleDelete(category.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
      {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Category</h2>
              <form onSubmit={()=>handleSubmit(category.id)}>
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
  );
};

export default CategoryCard;