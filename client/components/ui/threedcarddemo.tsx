import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { useMycontext } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

export function ThreeDCardDemo({
  card,
}: {
  card: {
    title: string;
    image: string;
    price: number;
  };
}) {
  const { cart, setCart } = useMycontext();
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  function addtoCart() {
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
  }

  return (
    <div className="my-10 shadow-2xl flex flex-col h-[24rem] md:h-[30rem] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="h-[30%]">
        <Image
          src={card.image}
          height={800}
          width={1000}
          alt="thumbnail"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="h-[30%] p-4 bg-white">
        <div className="text-lg md:text-xl font-bold text-neutral-600 mb-1">
          {card.title}
        </div>
        <div className="text-lg md:text-xl text-neutral-500 mb-3">
          {card.price} Rs
        </div>
        <div className="flex justify-center items-center">
          <button
            className="relative px-6 py-2 md:px-10 md:py-3 w-full bg-black hover:bg-white border-2 border-black text-white hover:text-black flex items-center justify-center transition-colors duration-300"
            onClick={addtoCart}
          >
            <FaShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart →
          </button>
        </div>
      </div>
    </div>
  );
}
