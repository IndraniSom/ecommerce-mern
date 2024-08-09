"use client"    
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
const Featured = () => {
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsSlideInOpen(true);
  };

  const handleClose = () => {
    setIsSlideInOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="w-full min-h-screen  bg-background">
      <Navbar/>
      <div className="flex w-full justify-center items-center py-7 ">
        <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative pl-5 md:pl-20 text-gray-800 dark:text-gray-200">
          Featured Products
        </h1>
      </div>
      <BentoGrid className="max-w-5xl mx-auto pb-20">
        {items.map((item, i) => (
          <div key={i} onClick={() => handleItemClick(item)} >
            <BentoGridItem
              
              header={item.header}
              className={item.className}
            />
            
          </div>
        ))}
      </BentoGrid>

      {isSlideInOpen && selectedItem && (
        <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          <button
            className="absolute top-5 right-5 text-xl text-gray-800 dark:text-gray-200"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="p-10">
            <Image
              src={selectedItem.header}
              alt={selectedItem.title}
              width={1000}
              height={1000}
              className="w-full h-64 object-cover mb-5"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
            <p className="text-lg mb-5">{selectedItem.description}</p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                Add to Cart
              </button>
              <Link href="/cart">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                Go to Cart
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

const items = [
  {
    title: "Tote bags",
    description: "350Rs",
    header: "/assets/feature1.png",
    className: "md:col-span-2",
  },
  {
    title: "Crockery sets",
    description: "500Rs",
    header: "/assets/feature2.png",
    className: "md:col-span-1",
  },
  {
    title: "Crockery sets",
    description: "500Rs",
    header: "/assets/feature2.png",
    className: "md:col-span-1",
  },
  {
    title: "Crockery sets",
    description: "500Rs",
    header: "/assets/feature2.png",
    className: "md:col-span-1",
  },
  {
    title: "Tote bags",
    description: "350Rs",
    header: "/assets/feature1.png",
    className: "md:col-span-2",
  },
  {
    title: "Tote bags",
    description: "350Rs",
    header: "/assets/feature1.png",
    className: "md:col-span-2",
  },
 
];

export default Featured;
