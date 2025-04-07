"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // This is the Navbar component

    // I NEED TO MAKE THE LOGO LEFT INSTEAD
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-[#10121A] text-white shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo size="text-2xl" additionalClasses="mr-4" />

        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:underline">
              الرئيسية
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              من نحن
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              تواصل معنا
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
