'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
 
  

  

  

  return (
    <div className='w-full bg-background min-h-screen'>
      <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative text-gray-800 dark:text-gray-200 pt-5">
      Tote bags
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-5 py-10">
        <div className="w-full md:w-1/2 h-96">
          <Image
            src="/assets/feature1.png"
            height={1000}
            width={1000}
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-start items-start px-5 md:px-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-neutral-600 mt-5 md:mt-0">
            Rs. 350
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet, id assumenda tenetur ratione sapiente, inventore impedit quos voluptate unde, doloremque corporis nisi? Culpa blanditiis, fugit autem quod saepe officiis!
          </p>
          <button
            className="mt-10 px-8 py-3 border-2 border-black dark:border-white uppercase bg-secondary_color text-black transition duration-200"
            
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductDetail;
