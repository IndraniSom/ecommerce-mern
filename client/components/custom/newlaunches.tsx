'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useMycontext } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewAll, setViewAll] = useState(false);
  const { cart, setCart } = useMycontext();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const addtoCart = (product: Product) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first',
        showConfirmButton: true,
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }

    const newCart = {
      ...cart,
      items: [...cart.items, { ...product, count: 1 }],
    };
    setCart(newCart);

    Swal.fire({
      icon: 'success',
      title: 'Item added to cart',
      showConfirmButton: true,
      confirmButtonText: 'Go to Cart',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/cart');
      }
    });
  };

  const handleViewAllClick = () => {
    setViewAll(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className='w-full min-h-screen bg-background'>
      <Navbar/>
      <div className="flex flex-col w-full pt-20 items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative pl-5 md:pl-20 text-gray-800 dark:text-gray-200 pt-5">
          New Launches
        </h1>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full px-5 pl-10">
          {products.map((product) => (
            <div key={product._id} className="bg-white flex flex-col h-full max-w-xs mx-auto border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-1">Rs {product.price}</p>
                <p className="text-gray-500 text-sm mt-2 flex-grow">{product.description}</p>
                <div className="flex justify-center mt-4">
                <button
                  className="relative w-full bottom-0 px-2 md:px-14 py-1 md:py-3  bg-black hover:bg-white border-2 border-black text-white hover:text-black flex items-center justify-center overflow-hidden hover-transition"
                  onClick={() => addtoCart(product)}
                >
                  <span className="button-content flex items-center">
                    <FaShoppingCart className="w-5 h-5 mr-1 md:mr-2" />
                    Add to Cart →
                  </span>
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* {!viewAll && (
          <div className="flex flex-col justify-center items-center w-full pb-10 mt-7 md:mt-0">
            <button
              className="px-8 py-2 border-2 border-black dark:border-white uppercase bg-secondary_color text-black transition duration-200 text-sm shadow-md hover:shadow-lg"
              onClick={handleViewAllClick}
            >
              View All Products →
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Page;
