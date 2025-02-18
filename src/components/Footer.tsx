import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        {/* Logo or Brand Name */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">MyBrand</h1>
        </div>

        {/* Social Media Icons */}
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
        </div>

        {/* Footer Links */}
        <div className="text-sm text-gray-400">
          <a href="#" className="mx-2 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="mx-2 hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="mx-2 hover:text-white">
            Contact Us
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
