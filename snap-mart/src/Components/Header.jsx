import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const {logout,authVerify} = useAuth()
  const allProducts = useSelector((state)=>state.product.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  console.log(allProducts);
  const searchedProducts = allProducts.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(searchedProducts);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
      authVerify()
        .then((res) => {
          setIsAuthenticated(res);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    setIsSearchOpen(false);
  };

  const handleProfileEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsProfileOpen(true);
  };

  const handleProfileLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };
  const handleProduct = (id)=>{
    navigate(`/products/${id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  }

  const handleLogout = async()=>{
    navigate("/");
    await logout();
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-light tracking-wider text-black uppercase">
              SnapMart
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-8 font-sans">
            <Link to="/electronics" className="text-md text-gray-900 hover:text-gray-600 transition-colors">
              Electronics
            </Link>
            <Link to="/fashion" className="text-md text-gray-900 hover:text-gray-600 transition-colors">
              Fashion & Apparel
            </Link>
            <Link to="/homeandkitchen" className="text-md text-gray-900 hover:text-gray-600 transition-colors">
              Home & Kitchen
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <FaSearch className="text-lg" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-10 right-0 w-80 bg-white shadow-lg rounded-lg p-4">
                  <form onSubmit={handleSearch} className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, designers..."
                      className="w-full pl-10 pr-4 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-all"
                      autoFocus
                    />
                  </form>

                  {searchQuery && searchedProducts.length > 0 && (
                    <ul className="mt-2 max-h-60 overflow-y-auto">
                      {searchedProducts.map((product) => (
                        <li onClick={()=>handleProduct(product.id)}
                          key={product.id}
                          className="px-3 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors rounded"
                        >
                          {product.name}
                        </li>
                      ))}
                    </ul>
                )}

                {searchQuery && searchedProducts.length === 0 && (
                  <p className="mt-2 text-sm text-gray-500 px-3">No products found</p>
                )}
               </div>
              )}
            </div>

            <Link
              to="/cart"
              className="text-gray-900 hover:text-gray-600 transition-colors flex items-center"
            >
              <FaShoppingBag className="text-lg" />
              <span className="ml-1 text-sm hidden md:inline"></span>
            </Link>

            <div
              className="relative"
              ref={profileRef}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
            >
              <button className="text-gray-900 hover:text-gray-600 transition-colors flex items-center">
                <FaUser className="text-lg" />
              </button>
              {isProfileOpen && (
                <div
                  className="absolute top-10 right-0 w-40 bg-white shadow-lg rounded-lg py-2"
                  onMouseEnter={handleProfileEnter}
                  onMouseLeave={handleProfileLeave}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/auth"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {isAuthenticated?"Logout":"Login"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;