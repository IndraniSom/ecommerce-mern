'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full min-h-screen bg-background'>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-5">
        <div className="w-full md:w-1/2 bg-white p-5 rounded-lg shadow-lg">
          <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-auto"/>
          <h1 className="text-2xl font-bold mt-5">{product.name}</h1>
          <p className="text-lg mt-2">Price: Rs {product.price}</p>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
