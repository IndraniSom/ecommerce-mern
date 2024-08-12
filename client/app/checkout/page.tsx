"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useMycontext } from '@/Context/CartContext';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC = () => {
  const { cart, setCart } = useMycontext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress1: '',
    city: '',
    postal: '',
    country: '',
    phone: ''
  });
  const router = useRouter();
  const DELIVERY_FEE = 40;
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCart({ items: parsedCartItems });
    }
  }, [setCart]);

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + DELIVERY_FEE;
  };

  const razorPayPaymentHandler = async () => {
    setIsProcessing(true);
    try {
      const totalAmount = calculateTotal() * 100; // Convert to smallest currency unit (paise)
    
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }), // Send the amount to the backend
      });
    
      const data = await response.json();
    
      if (!data.orderId) {
        throw new Error('Failed to create order');
      }
    
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: totalAmount,
        currency: 'INR',
        name: 'Prathibha Connect',
        description: 'Payment',
        image: '/logo.png',
        order_id: data.orderId,
        handler: function(response: any) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Your payment was completed successfully.',
          });
         
        },
        prefill: {
          name: '',
          email: '', 
          contact: '', 
        },
        theme: {
          color: '#3399cc',
        },
        method: {
          upi: true, // Enable UPI option
          netbanking: true,
          card: true,
          wallet: true,
          emi: true,
        },
      };
    
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'An error occurred during the payment process.',
      });
      console.error('Payment Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  const ordercreate = async () => {
    const orderItems = cart.items.map(item => ({
      product: item._id,
      name: item.name,
      price: item.price,
    }));
  
    const order = {
      orderItems,
      shippingAddress1: orderDetails.shippingAddress1,
      city: orderDetails.city,
      postal: orderDetails.postal,
      country: orderDetails.country,
      phone: orderDetails.phone,
      totalPrice: calculateTotal(),
    };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify(order),
      });
  
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Order Created',
          text: 'Your order has been created successfully.',
        });
        localStorage.removeItem("cartItems");
        setCart({ items: [] });
        setCounts([]);
        
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Order Creation Failed',
          text: data.message,
        });
        console.error('Order creation failed:', data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Order Creation Error',
        text: 'An error occurred while creating your order.',
      });
      console.error('Order creation error:', error);
    }
  };

  const handlePayNow = () => {
    ordercreate();
    razorPayPaymentHandler();
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-background min-h-screen pb-10">
      <div className="w-full md:w-[50%] pl-14 flex-col min-h-screen bg-background py-10 pr-10">
        <Link href="/" className="flex text-xl font-Poppins font-bold w-fit pb-10">
          <FaArrowAltCircleLeft className="h-10 w-10" />
          <span className="pt-1 pl-3">Go Back Home</span>
        </Link>
        <div className="w-full space-y-4">
          <input
            type="text"
            name="shippingAddress1"
            className="w-full p-3 bg-white border border-secondary_color rounded"
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, shippingAddress1: e.target.value })
            }
            placeholder="Shipping Address"
          />
          <input
            type="text"
            name="city"
            className="w-full p-3 bg-white border border-secondary_color rounded"
            onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
            placeholder="City"
          />
          <input
            type="text"
            name="postal"
            className="w-full p-3 bg-white border border-secondary_color rounded"
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, postal: e.target.value })
            }
            placeholder="Postal Code"
          />
          <input
            type="text"
            name="country"
            className="w-full p-3 bg-white border border-secondary_color rounded"
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, country: e.target.value })
            }
            placeholder="Country"
          />
          <input
            type="text"
            name="phone"
            className="w-full p-3 bg-white border border-secondary_color rounded"
            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div className="flex flex-col pt-10">
        <div className="mr-5 bg-background border-[0.5px] border-secondary_color h-[20rem] w-[20rem]">
          <div className="w-full flex flex-col justify-center items-center pt-20 text-lg font-normal">
            <div className="text-2xl font-bold">
              Total: <span className="font-normal">{calculateTotal()} Rs</span>
            </div>
            <hr className="w-52 my-2 border-2 border-secondary_color" />
            <div className="text-2xl font-bold">
              Subtotal: <span className="font-normal">{calculateSubtotal()} Rs</span>
            </div>
            <hr className="w-52 my-2 border-2 border-secondary_color" />
            <div className="text-2xl font-bold">
              Delivery Fee: <span className="font-normal">{DELIVERY_FEE} Rs</span>
            </div>
            <hr className="w-52 my-2 border-2 border-secondary_color" />
            <div className="w-full items-center justify-center flex pt-5">
              <button
                onClick={handlePayNow}
                className="px-5 w-40 py-2 border-2 border-black dark:border-white uppercase bg-secondary_color items-center justify-center text-white transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
              >
                Pay Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
