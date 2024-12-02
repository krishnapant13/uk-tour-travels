import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Uttarakhand Tour & Travels</h3>
            <p className="text-sm text-gray-400">
              Explore the beauty of Uttarakhand with us.
            </p>
          </div>

          {/* Center Section (Links) */}
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center md:justify-start">
              <li className="mx-3">
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Uttarakhand Tour & Travels. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
