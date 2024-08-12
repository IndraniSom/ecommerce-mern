"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrderPage: React.FC = () => {
  interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    orderItems: any[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/myorders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("token") || ""}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          const data = await res.json();
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-background mx-auto p-4 min-h-screen items-center justify-center flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Paid</th>
                <th className="py-3 px-6 text-left">Delivered</th>
               
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order._id}
                  </td>
                  
                    {order.orderItems.map((item: any, index: any) => (
                      <>
                       <td key={index} className="py-3 px-6">
                       <p className="font-medium text-gray-800">{item.name}</p>
                        </td> 

                        <td key={index} className="py-3 px-6">
                          {item.price}INR
                        </td>
                        </>
                    ))}
                  
                  <td className="py-3 px-6">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                 
                  <td className="py-3 px-6">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-700 mt-10">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderPage;
