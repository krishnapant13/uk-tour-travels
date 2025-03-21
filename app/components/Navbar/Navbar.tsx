import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { FiPhone, FiMail } from "react-icons/fi";
import { MdOutlineWhatsapp } from "react-icons/md";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between md:px-6 pr-4 bg-white shadow-lg border-b border-gray-300 z-40">
      {/* Logo and Name */}
      <Link
        href="/"
        className="flex items-center space-x-4"
        aria-label="Go to homepage"
      >
        <div className="relative w-[180px] h-[60px] hidden md:block">
          <Image
            src="/logo.webp"
            alt="Uttarakhand Travel Logo"
            fill
            sizes="(max-width: 768px) 140px, (min-width: 769px) 180px"
            className="object-contain"
            priority
          />
        </div>
        <div className="relative w-[140px] h-[50px] md:hidden block">
          <Image
            src="/logo.webp"
            alt="Uttarakhand Travel Logo"
            fill
            sizes="(max-width: 768px) 140px, (min-width: 769px) 180px"
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Contact Info */}
      <div className="w-[45%] ">
        {/* Marquee for md and above */}
        <div className="hidden md:block">
          <Marquee gradient={false} speed={50}>
            <div className="flex items-center space-x-6">
              <Link
                href="tel:+919761409770"
                aria-label="Call us"
                className="flex items-center space-x-2"
              >
                <FiPhone size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  +91 97614 09770
                </span>
              </Link>

              <Link
                href="mailto:uttarakhandtravel4u@gmail.com"
                aria-label="Email us"
                className="flex items-center space-x-2"
              >
                <FiMail size={20} className="text-red-500" />
                <span className="text-sm font-medium text-gray-700">
                  uttarakhandtravel4u@gmail.com
                </span>
              </Link>

              <Link
                href="https://wa.me/919761409770?text=Hello!%20I'm%20interested%20in%20your%20taxi%20and%20tour%20services.%20Can%20you%20provide%20more%20details?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us"
                className="flex items-center space-x-2"
              >
                <MdOutlineWhatsapp size={20} className="text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  WhatsApp Us
                </span>
              </Link>
            </div>
          </Marquee>
        </div>

        {/* Just Icons on Small Screens */}
        <div className="flex  w-full justify-end items-end  space-x-4 md:hidden">
          <Link href="tel:+919761409770" aria-label="Call us">
            <FiPhone size={24} className="text-blue-500" />
          </Link>
          <Link
            href="mailto:uttarakhandtravel4u@gmail.com"
            aria-label="Email us"
          >
            <FiMail size={24} className="text-red-500" />
          </Link>
          <Link
            href="https://wa.me/919761409770?text=Hello!%20I'm%20interested%20in%20your%20taxi%20and%20tour%20services.%20Can%20you%20provide%20more%20details?"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
          >
            <MdOutlineWhatsapp size={24} className="text-green-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
