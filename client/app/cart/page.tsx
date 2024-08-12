"use client";
import React from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useMycontext } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

const DELIVERY_FEE = 40;

const CartPage = () => {
  const { cart, removeItemFromCart, updateItemCount } = useMycontext();
  const { isAuthenticated } = useAuth();

  const handleMinusClick = (index: number) => {
    if (cart.items[index].count > 1) {
      updateItemCount(index, cart.items[index].count - 1);
    }
  };

  const handlePlusClick = (index: number) => {
    updateItemCount(index, cart.items[index].count + 1);
  };

  const handleCountChange = (index: number, count: number) => {
    updateItemCount(index, count);
  };

  const handleDivCloseClick = (index: number) => {
    removeItemFromCart(index);
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.count, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + DELIVERY_FEE;
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="flex flex-col pl-4 pr-4 md:pl-10 md:pr-10 flex-grow">
          <Link href="/" className="flex text-lg md:text-xl font-Poppins font-bold pt-6 pb-10 md:pb-0">
            <FaArrowAltCircleLeft className="h-8 w-8 md:h-10 md:w-10" />
            <span className="pt-1 pl-3">Go Back Home</span>
          </Link>
          <div className="justify-start">
            <h1 className="text-2xl md:text-4xl font-semibold pt-10 md:pt-20 pl-0 md:pl-16">Cart</h1>
            <div className="px-2 md:px-10 py-4 md:py-7 w-full">
              {cart.items.length === 0 ? (
                <div>Your cart is empty.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-3 px-5">Product</th>
                        <th className="py-3 px-5">Name</th>
                        <th className="py-3 px-5">Quantity</th>
                        <th className="py-3 px-5">Price</th>
                        <th className="py-3 px-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-5">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-md">
                                No Image Available
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-5">{item.name}</td>
                          <td className="py-3 px-5 flex justify-center items-center">
                            <button
                              className="minus-btn bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                              onClick={() => handleMinusClick(index)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.count}
                              onChange={(e) => handleCountChange(index, Number(e.target.value))}
                              className="w-12 md:w-16 px-2 md:px-3 text-center mx-2 border border-gray-300 rounded-md"
                            />
                            <button
                              className="plus-btn bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                              onClick={() => handlePlusClick(index)}
                            >
                              +
                            </button>
                          </td>
                          <td className="py-3 px-5">{item.price * item.count} Rs</td>
                          <td className="py-3 px-5">
                            <AiOutlineClose
                              className="cursor-pointer p-1 h-7 w-7 text-red-600 hover:text-red-800 transition"
                              onClick={() => handleDivCloseClick(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        {cart.items.length > 0 && (
          <div className="flex justify-end mt-10 md:mt-32 bg-background border-[0.5px] border-secondary_color p-5 md:p-10 w-full md:w-[20rem]">
            <div className="w-full flex flex-col justify-center items-center text-lg font-normal">
              <div className="text-xl md:text-2xl font-bold">
                Total: <span className="font-normal">{calculateTotal()} Rs</span>
              </div>
              <hr className="w-full my-2 border-2 border-secondary_color" />
              <div className="text-xl md:text-2xl font-bold">
                Subtotal: <span className="font-normal">{calculateSubtotal()} Rs</span>
              </div>
              <hr className="w-full my-2 border-2 border-secondary_color" />
              <div className="text-xl md:text-2xl font-bold">
                Delivery Fee: <span className="font-normal">{DELIVERY_FEE} Rs</span>
              </div>
              <hr className="w-full my-2 border-2 border-secondary_color" />
              <div className="w-full items-center justify-center flex pt-5">
                <Link href="/checkout">
                  <button className="px-4 py-2 md:px-5 md:py-2 border-2 border-black uppercase bg-secondary_color text-white transition duration-200 text-sm shadow-lg">
                    CheckOut →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
