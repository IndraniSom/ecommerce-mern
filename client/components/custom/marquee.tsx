'use client';

import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import Link from 'next/link';
import { useAuth } from '@/Context/AuthContext';

const MarqueeComponent = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setGreeting(`Hey, ${user.firstName}!`);
    } else {
      setGreeting('Hey, user!');
    }
  }, [isAuthenticated, user]);

  return (
    <div className='flex w-full bg-[#E7D4B5] h-8 font-Poppins text-sm'>
      <div className='flex w-[100%] md:w-[70%]'>
        <Marquee>
          <span className="mx-10">😃2M+ HAPPY CUSTOMERS</span>
          <span className="mx-10">💱 7 DAYS FREE EXCHANGE</span>
          <span className="mx-10">🚚 FREE SHIPPING ABOVE ₹499</span>
        </Marquee>
      </div>
      <div className='hidden md:flex w-[30%] gap-10 pl-20 pt-1 font-Cinzel_Decorative'>
        {isAuthenticated ? (
          <>
            <span className='pt-1'>{greeting}</span>
            <button onClick={logout} className='pt-1'>Logout</button>
          </>
        ) : (
          <Link href="/login" className='pt-1'>Login/SignUp</Link>
        )}
        <div className='flex'>
          <Link href="/orderhistory" className='pt-1'>Track your orders</Link>
        </div>
      </div>
    </div>
  );
};

export default MarqueeComponent;