"use client";

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
import Link from 'next/link';
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { cart, setCart } = useMycontext();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const isProductInCart = (productId: string) => {
    return cart.items.some(item => item._id === productId);
  };

  const addToCart = (product: Product) => {
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

    if (isProductInCart(product._id)) {
      Swal.fire({
        icon: 'warning',
        title: "Sorry, it's already in the cart",
        showConfirmButton: true,
        confirmButtonText: 'Go to Cart',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/cart');
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

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className='w-full min-h-screen bg-background'>
      <Navbar/>
      <div className="flex flex-col w-full pt-20 items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative pl-5 md:pl-20 text-gray-800 dark:text-gray-200 pt-5">
          New Launches
        </h1>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full px-5 pl-10">
          {displayedProducts.map((product) => (
             <Link key={product._id} href={`/products/${product._id}`}>
            <div  className="bg-white flex flex-col h-full max-w-xs mx-auto border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
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
                
                <div className="flex justify-center mt-4">
                  <button
                    className={`relative w-full bottom-0 px-2 md:px-14 py-1 md:py-3 ${
                      isProductInCart(product._id) ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-black hover:bg-white border-2 border-black text-white hover:text-black'
                    } flex items-center justify-center overflow-hidden hover-transition`}
                    onClick={() => !isProductInCart(product._id) && addToCart(product)}
                    disabled={isProductInCart(product._id)}
                  >
                    <span className="button-content flex items-center">
                      <FaShoppingCart className="w-5 h-5 mr-1 md:mr-2" />
                      {isProductInCart(product._id) ? 'Already in Cart' : 'Add to Cart →'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>

        {products.length > 4 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="p-4 bg-secondary_color text-white rounded-md  transition duration-300"
            >
              {showAll ? 'Show Less' : 'View All Products'}
            </button>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Page;
