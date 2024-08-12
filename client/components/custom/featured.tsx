"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/most-searched-products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full px-10 py-7">
      {/* Render heading only if there are products */}
      {products.length > 0 && (
        <div className="flex w-full justify-center items-center py-7">
          <h1 className="text-3xl md:text-6xl font-bold font-Cinzel_Decorative pl-5 md:pl-20 text-gray-800 dark:text-gray-200">
            Featured Products
          </h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-600 hidden">No featured products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={product.header}
                alt={product.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-lg font-medium mb-4">{product.description}</p>
                <Link href={`/products/${product._id}`}>
                  <a className="px-4 py-2 bg-blue-500 text-white rounded-md">View Details</a>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
