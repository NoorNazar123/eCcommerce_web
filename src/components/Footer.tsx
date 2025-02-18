import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="mb-8 md:mb-0">
            <h1 className="text-2xl font-bold mb-4">FashionEcom</h1>
            <p className="text-sm text-gray-400">
              Discover the latest trends in fashion. Shop from our curated
              collection of clothing, accessories, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="text-sm text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Shop
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  New Arrivals
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Sale
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="text-sm text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Shipping Information
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Returns & Exchanges
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-pink-600 text-white rounded-r-lg px-4 py-2 hover:bg-pink-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="mb-4">
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} FashionEcom. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
