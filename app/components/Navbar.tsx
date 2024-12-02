"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      } border-b border-gray-300 z-50`}
    >
      {/* Logo and Name */}
      <div className="flex items-center space-x-4">
        <Image
          src="/yum.png" 
          alt="Brand logo"
          width={80}
          height={80}
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/users" className="text-gray-700 text-sm hover:text-gray-900">
          Home
        </Link>
        <Link href="/users/new" className="text-gray-700 text-sm hover:text-gray-900">
          Services
        </Link>
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col items-start p-6 space-y-4">
          <button className="self-end" onClick={() => setIsMenuOpen(false)}>
            <FiX size={24} />
          </button>
          <Link
            href="#home"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#services"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
