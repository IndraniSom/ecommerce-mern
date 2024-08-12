'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useMycontext } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
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
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string | string[]) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/id/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-5">
        <div className="w-full md:w-2/3  p-8 ">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={200}
                className="w-full h-[30rem] rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-xl font-semibold text-green-600 mb-2">Rs {product.price}</p>
                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                <p className={`text-lg font-semibold mb-4 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                </p>
               
              </div>
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

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                index < product.rating ? <AiFillStar key={index} className="text-yellow-500" /> : <AiOutlineStar key={index} className="text-yellow-500" />
              ))}
              <span className="text-lg font-medium ml-2">{product.rating} ({product.numReviews} Reviews)</span>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">{review.name}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        starIndex < review.rating ? <AiFillStar key={starIndex} className="text-yellow-500" /> : <AiOutlineStar key={starIndex} className="text-yellow-500" />
                      ))}
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
