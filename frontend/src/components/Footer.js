import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const primaryColor = '#007BFF';

  return (
    <footer className="w-full bg-gray-800 text-white pt-4 pb-2 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between border-b border-gray-700 pb-2 mb-2">
          {/* Section 1: Logo and Slogan */}
          <div className="w-full md:w-1/4 mb-2">
            <h3 className="text-lg font-bold mb-1" style={{ color: primaryColor }}>
              Spray Info
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              Behind every success, there is sacrifice.
            </p>
            <p className="text-sm text-gray-500">
              Your partner for in-person training.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="w-full md:w-1/4 mb-2">
            <h4 className="text-lg font-semibold mb-1 border-b border-gray-700 pb-1">
              Navigation
            </h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className=" text-lg text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/formations" className="text-lg text-gray-400 hover:text-white transition">Courses</Link></li>
              <li><Link to="/aboutUs" className="text-lg text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-lg text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact Details */}
          <div className="w-full md:w-1/4 mb-2">
            <h4 className="text-lg font-semibold mb-1 border-b border-gray-700 pb-1">
              Contact
            </h4>
            <div className="space-y-1 text-xs">
              <p className="flex items-center text-gray-400">
                <FaEnvelope className="mr-2" style={{ color: primaryColor }} /> 
                <a href="mailto:contact@sprayinfo.com" className="text-lg hover:text-white">sprayinfo.siwbs.com</a>
              </p>
              <p className="flex items-center text-lg text-gray-400">
                <FaPhone className="mr-2" style={{ color: primaryColor }} /> 
                +261 38 37 930 53
              </p>
              <p className="text-gray-400 text-lg">
                Address: Quarrière Imandry, Fianarantsoa Madagascar
              </p>
            </div>
          </div>

          {/* Section 4: Social Media */}
          <div className="w-full md:w-1/4 mb-2">
            <h4 className="text-lg font-semibold mb-1 border-b border-gray-700 pb-1">
              Follow Us
            </h4>
            <div className="flex space-x-2">
              <a href="https://www.facebook.com/profile.php?id=100083174350034" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#1877F2] transition">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="text-center text-gray-500 text-sm  pt-1 border-t border-gray-700">
          © 2025 - Spray Info Formation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;