import React, { useEffect, useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, deleteProducts, fetchProducts } from '../Store/Slices/productSlice';
import { getCategories } from '../Store/Slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const products = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.categories.categories);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleLogout = async () => {
    await logout();
  };

  const handleData = async (product) => {
    dispatch(addProducts(product));
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductEdit = (product) => {
    setIsFormOpen(true);
    setFormData(product);
    handleProductDelete(product.id);
  };

  const handleProductDelete = (id) => {
    dispatch(deleteProducts(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      description: `This is ${formData.name}`,
    };
    handleData(product);
    setFormData({ name: '', category: '', price: '', imageUrl: '' });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    if (formData.name !== '') {
      dispatch(addProducts(formData));
    }
    setFormData({ name: '', category: '', price: '', imageUrl: '' });
  };

  const filteredProducts = category ? products.filter((product) => product.category === category) : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition-all duration-300 font-medium shadow-sm"
            >
              Logout
            </button>
            <button
              onClick={() => navigate('/category')}
              className="bg-purple-500 text-white px-5 py-2.5 rounded-lg hover:bg-purple-600 transition-all duration-300 font-medium shadow-sm"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium shadow-sm"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate('/manageOrders')}
              className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 transition-all duration-300 font-medium shadow-sm"
            >
              Manage Orders
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="group cursor-pointer" onClick={() => setCategory(null)}>
            <div className="relative w-32 h-32 bg-white rounded-xl shadow-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://cdn.textstudio.com/output/sample/normal/9/2/0/5/all-logo-73-5029.png"
                alt="All"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <p className="text-center mt-2 text-lg font-semibold text-gray-700 group-hover:text-blue-600">All</p>
          </div>
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer"
              onClick={() => (category.name === 'All' ? setCategory(null) : setCategory(category.name))}
            >
              <div className="relative w-32 h-32 bg-white rounded-xl shadow-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={category.url}
                  alt={category.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="text-center mt-2 text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                <p className="text-gray-900 font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleProductEdit(product)}
                    className="bg-yellow-400 text-white px-4 py-1.5 rounded-md hover:bg-yellow-500 transition-all duration-200 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleProductDelete(product.id)}
                    className="bg-red-400 text-white px-4 py-1.5 rounded-md hover:bg-red-500 transition-all duration-200 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    step="0.01"
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    required
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;