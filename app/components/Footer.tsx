"use client";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const Footer: React.FC = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP;
  const message = encodeURIComponent(
    "Hello, I am interested in booking one of the tours!"
  );

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
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
          <div className="mb-4 md:mb-0 w-full flex flex-wrap justify-around items-center">
            <Link href="/about">
              <FaInfoCircle size={40} />
            </Link>
            <FaFacebook size={40} />
            <FaInstagram size={40} />
            <FaWhatsapp
              size={40}
              className="cursor-pointer"
              aria-label="Chat with us on WhatsApp"
              onClick={handleWhatsAppClick}
            />
          </div>

          {/* Right Section */}
          <div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Uttarakhand Tour & Travels. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
