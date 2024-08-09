"use client";
import React from "react";
import { ThreeDCardDemo } from "../ui/threedcarddemo";
import { Card } from "@/components/ui/cardone";
import Link from "next/link";
type Product = {
  title: string;
  categoryId: string;
  thumbnail: string;
  description: string;
};

export const products: Product[] = [
  {
    title: "2024 Collection",
    categoryId: "https://cursor.so",
    thumbnail: "/assets/bagblog.png",
    description: "March 01",
  },
  {
    title: "Skin is our priority",
    categoryId: "https://userogue.com",
    thumbnail: "/assets/skinblog.png",
    description: "July 02",
  },
  {
    title: "Sustainable interior ",
    categoryId: "https://cursor.so",
    thumbnail: "/assets/interiorblog.png",
    description: "June 09",
  },
  {
    title: "Sustainable Clothing ",
    categoryId: "https://gomoonbeam.com",
    thumbnail: "/assets/blog4.png",
    description: "Jan 01",
  },
];

const Blogs: React.FC = () => {
  return (
    <div id="blogs" className="flex flex-col w-full pt-5 md:pt-20">
      <div className="flex w-full justify-center items-center">
        <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative pl-5 md:pl-20 text-gray-800 dark:text-gray-200">
          Our Blogs
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 px-5 md:px-20 py-5 md:py-10">
        {products.map((product) => (
          <Card key={product.title} product={product} showButton={true} />
        ))}
      </div>
      
    </div>
  );
};

export default Blogs;
