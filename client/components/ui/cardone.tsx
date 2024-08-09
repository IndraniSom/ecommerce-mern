"use client";
import { cn } from "@/utils/cn";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";
export function Card({
  product,
  showButton = false, // Adding a new prop for controlling button visibility
}: {
  product: {
    title: string;
    categoryId: string;
    thumbnail: string;
    description: string;
  };
  showButton?: boolean; // This prop is optional and defaults to false
}) {
  return (
    <div className="max-w-xs w-full ">
      <div
        className="group w-full cursor-pointer overflow-hidden relative card h-60 md:h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
      >
        <div className="text relative z-30 h-40">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {product.title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {product.description}
          </p>
          {/* Conditionally rendering the button based on showButton prop */}
          {showButton && (
            
            <button className="flex px-2 md:px-5 py-0 md:py-2 bg-[#E7D4B5] text-black rounded ">
              Read More
              <Link href="/blog" className="pt-3 md:pt-0"> <FaArrowCircleRight className="text-black w-6 h-6 ml-5"/></Link>
            </button>
            
            
          )}
        </div>
      </div>
    </div>
  );
}