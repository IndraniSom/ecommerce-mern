"use client"
import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useMycontext } from "@/Context/CartContext";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useMycontext();

  return (
    <div id="navbar" className="top-0 left-0 right-0 bg-background w-full flex z-50 md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="justify-start  top-7  z-50"
      >
        {isOpen ? (
          <XIcon className="h-8 w-8 fixed text-secondary_color ml-36 transition-transform duration-500 transform rotate-180" />
        ) : (
          <MenuIcon className="h-8 w-8 text-secondary_color transition-transform duration-500" />
        )}
      </button>
      <Link href="/" className="ml-16">
        <div className="text-2xl font-semibold font-Cinzel_Decorative text-secondary_color pt-2">
          ARC
        </div>
      </Link>
      <Link href="/cart">
        <button className="bg-transparent text-black px-5 py-3 h-fit font-Poppins align-middle flex justify-center text-nowrap relative ml-auto mr-7">
          <FaShoppingCart className="w-5 h-5 mr-2 text-[#9D4439]" />
          {cart.items.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-secondary_color rounded-full">
              {cart.items.length}
            </span>
          )}
          Your Cart
        </button>
      </Link>
      
      <div
        className={`transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed flex flex-col bg-background items-center font-bold text-secondary_text justify-center top-0 left-0 h-full w-[70%] z-20 font-antonio text-[30px]`}
      >
        <div className={`flex-col flex gap-5 text-center text-xl font-poppins font-medium text-secondary_color px-10 py-10 transition-all ease-in-out duration-300 ${isOpen ? "flex" : "hidden"}`}>
          <Link href="/newlaunches" className="hover:text-text-secondary_color">New</Link>
          <Link href="/featured" className="hover:text-text-secondary_color">Featured Product</Link>
          <Link href="/blogs" className="hover:text-text-secondary_color">Blogs</Link>
          <Link href="#" className="hover:text-text-secondary_color">Offers</Link>
          <Link href="#about" className="hover:text-text-secondary_color">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;