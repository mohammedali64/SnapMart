import React from 'react'

const Footer = () => {
  return (
    <div>
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-900">Never miss a thing</h3>
            <p className="text-gray-600">Sign up for promotions, tailored new arrivals, stock updates and more - straight to your inbox</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">GET UPDATES BY</h4>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 border rounded w-full md:w-2/3"
              />
              <button className="bg-black text-white p-2 rounded w-full md:w-auto mt-4 md:mt-0">Sign Up</button>
            </div>
            <p className="text-sm text-gray-600 mt-2">By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you have read our Privacy Policy. Unsubscribe anytime at the bottom of our emails or by replying STOP to any of our SMS.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
                <li><a href="#" className="hover:text-gray-900">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-gray-900">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-gray-900">Payment Options</a></li>
                <li><a href="#" className="hover:text-gray-900">SnapMart Promise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About SnapMart</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Our Story</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">SnapMart App</a></li>
                <li><a href="#" className="hover:text-gray-900">Sustainability</a></li>
                <li><a href="#" className="hover:text-gray-900">SnapMart Advertising</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Offers</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Loyalty Program</a></li>
                <li><a href="#" className="hover:text-gray-900">Invite Friends</a></li>
                <li><a href="#" className="hover:text-gray-900">Student Discounts</a></li>
                <li><a href="#" className="hover:text-gray-900">Seasonal Sales</a></li>
              </ul>
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-gray-900"><span className="sr-only">Instagram</span>📸</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900"><span className="sr-only">Facebook</span>👍</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900"><span className="sr-only">Twitter</span>🐦</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900"><span className="sr-only">YouTube</span>🎥</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 text-sm">
            <a href="#" className="mx-2 hover:text-gray-900">Privacy Policy</a> | 
            <a href="#" className="mx-2 hover:text-gray-900">Terms and Conditions</a> | 
            <a href="#" className="mx-2 hover:text-gray-900">Accessibility</a>
            <p className="mt-2">© 2025 SnapMart Ltd. All rights reserved. SnapMart and the SnapMart logo are trademarks of SnapMart Ltd and are registered in numerous jurisdictions around the world.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
