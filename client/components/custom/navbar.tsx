"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import MobileNavbar from "./mobilenavbar";
import { useMycontext } from "@/Context/CartContext";
import axios from "axios";

export function Navbar() {
  const { cart } = useMycontext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<{ _id: string, name: string, description: string }[]>([]);
  const [isFixed, setIsFixed] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = async (e:any) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?q=${e.target.value}`);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setFilteredProducts([]);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`w-full z-50 bg-background border-b-[0.5px] border-secondary_color ${isFixed ? "fixed top-0 left-0" : ""}`}>
      <div className="flex justify-between px-10 py-4">
        <Link href="/" className="hidden md:flex">
          <div className="text-2xl font-semibold font-Cinzel_Decorative text-secondary_color pt-2">
            ARC
          </div>
        </Link>

        <div className="pt-2 hidden md:flex justify-between gap-10 text-text_black">
          <Link href="/newlaunches" className="hover:text-secondary_color font-Poppins">
            New
          </Link>
          <Link href="/featured" className="hover:text-secondary_color font-Poppins">
            Featured Product
          </Link>
          <Link href="/blogs" className="hover:text-secondary_color font-Poppins">
            Blogs
          </Link>
          <Link href="/" className="hover:text-secondary_color font-Poppins">
            Offers
          </Link>
          <Link href="/#about" className="hover:text-secondary_color font-Poppins">
            About Us
          </Link>
        </div>

        <div className="hidden md:flex gap-5">
          <button
            className="bg-transparent text-black px-5 py-3 h-fit font-Poppins align-middle flex justify-center text-nowrap"
            onClick={toggleSearch}
          >
            <FaSearch className="w-5 h-5 mr-2 text-secondary_color" />
            Search
          </button>
          <Link href="/cart">
            <button className="bg-transparent text-black px-5 py-3 h-fit font-Poppins align-middle flex justify-center text-nowrap relative">
              <FaShoppingCart className="w-5 h-5 mr-2 text-[#9D4439]" />
              {cart.items.length > 0 && (
                <span className="absolute top-0 left-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-secondary_color rounded-full">
                  {cart.items.length}
                </span>
              )}
              Your Cart
            </button>
          </Link>
        </div>
        <MobileNavbar />
      </div>

      {searchOpen && (
        <div className="w-full z-50 bg-background shadow-md p-4 absolute left-0">
          <div className="flex pl-5 bg-background">
            <FaSearch className="w-5 h-5 mt-[9px] mr-1 text-black" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 bg-background focus:outline-none" 
              placeholder="Search..."
            />
          </div>
          {filteredProducts.length > 0 && (
            <div className="mt-4 bg-white p-4 shadow-md">
              {filteredProducts.map((product) => (
                <Link key={product._id} href={`/products/${product._id}`}>
                  <div className="py-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-sm">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
