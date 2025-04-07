"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUsername(null);
      // Redirect to home page after sign out
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Get username from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          // Parse the user data from localStorage - could be a string or an object
          const userData = JSON.parse(storedUser); // Changed 'let' to 'const'

          // Log the raw data to debug
          console.log("User data structure:", userData);

          // Try to access firstName directly - if it exists, use it
          if (userData.firstName) {
            setUsername(userData.firstName);
          }
          // Sometimes the data might be nested under a 'user' property
          else if (userData.user && userData.user.firstName) {
            setUsername(userData.user.firstName);
          }
          // If there's no firstName, try looking for other name properties
          else {
            // Prioritize name fields over email
            setUsername(
              userData.name ||
                userData.displayName ||
                userData.fullName ||
                (userData.user ? userData.user.name : null) ||
                "User"
            );
          }
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          setUsername("User");
        }
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-[#10121A] text-white shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo size="text-2xl" additionalClasses="mr-4" />

        <div className="flex items-center">
          <ul className="flex space-x-6 ml-4">
            <li>
              <Link href="/" className="hover:underline">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                تواصل معنا
              </Link>
            </li>
          </ul>

          <div className="border-r border-gray-400 h-6 mx-4"></div>

          {username ? (
            <div className="flex items-center">
              <div className="text-sm m-2">
                <span className="m-2">مرحبًا،</span>
                <span className="font-bold">{username}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-400 hover:text-red-500 transition-colors duration-300"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-sky-800 hover:bg-sky-900 text-white px-3 py-1 rounded-md transition-colors duration-300"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
