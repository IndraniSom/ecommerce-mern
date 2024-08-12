"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import { useRouter } from 'next/navigation';   
import { useAuth } from '@/Context/AuthContext'; 
import { useMycontext } from '@/Context/CartContext';              
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock?: number;
  cta?: string;
  rating?: number;
  numReviews?: number;
  reviews?: {
    name: string;
    rating: number;
    comment: string;
  }[];
}

const ProductsPage = ({ params }: { params: { category: string } }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { cart, setCart } = useMycontext();
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
  
    const api=process.env.BACKEND_URL;
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
    const fetchProducts = async () => {
      const { category } = params;
      if (!category) {
        setError('Category is not provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/category/${category}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 pt-20 pb-20">Products in {params.category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
            <Image src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" width={600} height={700} />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-900">Price: Rs{product.price}</p>
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
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default ProductsPage;
