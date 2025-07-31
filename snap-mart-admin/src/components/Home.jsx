import React, { useEffect, useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { addProduct, getProducts } from '../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, deleteProducts, fetchProducts } from '../Store/Slices/productSlice';
import { getCategories } from '../Store/Slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category,setCategory] = useState(null);
  const products = useSelector((state)=>state.products.items);
  const categories = useSelector((state)=>state.categories.categories);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch]);

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

  const handleProductEdit = (product)=>{
    setIsFormOpen(true);
    setFormData(product);
    handleProductDelete(product.id)
  }

  const handleProductDelete = (id)=>{
    dispatch(deleteProducts(id));
  }

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
    console.log(formData);
    formData.name === ''?console.log("noData"):dispatch(addProducts(formData));
    setFormData({ name: '', category: '', price: '', imageUrl: '' });
    
  };

  const filteredProducts = category?products.filter((product)=>product.category === category):products;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Home</h1>
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Add Product
          </button>
          <button onClick={()=>navigate("/manageOrders")} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
            Manage Orders
          </button>
        </div>
        <div className='flex flex-row'>
          <div>
              <img
                src="https://cdn.textstudio.com/output/sample/normal/9/2/0/5/all-logo-73-5029.png"
                alt="All"
                onClick={()=>setCategory(null)}
                className="w-32 h-32 object-contain border border-gray-200 rounded-md mb-4"
              />
              <p className="text-lg font-semibold text-gray-800 text-center">All</p>
            </div>
        {categories.map((category)=>(
          <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mr-3">
            <div className="flex flex-col items-center">
              <img
                src={category.url}
                alt={category.name}
                onClick={()=>category.name == 'All'?setCategory(null):setCategory(category.name)}
                className="w-32 h-32 object-contain border border-gray-200 rounded-md mb-4"
              />
              <p className="text-lg font-semibold text-gray-800 text-center">{category.name}</p>
            </div>
          </div>
        ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-900 font-bold mt-2">${product.price}</p>
              </div>
              <div>
                <button onClick={()=>handleProductEdit(product)}>Edit</button>
                <button onClick={()=>handleProductDelete(product.id)}>Delete</button> 
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price ($)"
                  required
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
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
    </div>
  );
};

export default Home;