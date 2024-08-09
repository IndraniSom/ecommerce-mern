"use client";
import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "@/components/ui/text-genrate-effect";
import Image from "next/image"
const about = () => {

  const ImageFrame = () => {
    // Array of image URLs
    const images = [
      "/assets/about1.png",
      "/assets/about2.png",
      "/assets/about3.png",
      
      // Add more images as needed
    ];

    // State to keep track of the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      // Change image every 3 seconds
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      // Clear the interval on component unmount
      return () => clearInterval(timer);
    }, [images.length]);

    return (
      <div id="about" className="w-[30rem] h-[30rem]">
        <Image src={images[currentImageIndex]} alt="Slideshow" width={1000} height={1000}/>
      </div>
    );
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full">
      <div className="flex flex-col w-full max-w-2xl mx-auto pl-3 md:pl-20">
        <h1 className="text-4xl font-bold pt-5">Our Story</h1>
        <div className="text-lg font-Poppins py-7">
        At ShopyHut, we &apos; re driven by a simple yet powerful mission: to provide
          sustainable solutions for everyday living. Born from a passion for
          protecting our planet, we meticulously curate eco-friendly products
          that not only support a sustainable lifestyle but also bring joy and
          simplicity to your daily routines. Our journey began with a
          realization that every choice we make has an impact on the
          environment. From the clothes we wear to the products we use,
          everything holds the potential to either harm or heal our world. 
        </div>
      </div>
      <div className="flex w-full max-w-2xl py-10 md:py-40 pb-10 pl-10 md:pl-28 pr-10">
        <ImageFrame />
      </div>
    </div>
  );
};

export default about;
