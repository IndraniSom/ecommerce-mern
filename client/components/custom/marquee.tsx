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
    <div className='flex flex-col md:flex-row w-full bg-[#E7D4B5] h-16 md:h-8 font-Poppins text-sm'>
      <div className='flex w-full md:w-[70%]'>
        <Marquee>
          <span className="mx-3 md:mx-10">😃2M+ HAPPY CUSTOMERS</span>
          <span className="mx-3 md:mx-10">💱 7 DAYS FREE EXCHANGE</span>
          <span className="mx-3 md:mx-10">🚚 FREE SHIPPING ABOVE ₹499</span>
        </Marquee>
      </div>
      <div className=' flex w-full md:w-[30%] gap-5 md:gap-10 pl-20 pt-1 font-Cinzel_Decorative '>
        {isAuthenticated ? (
          <>
            <span className='pt-1'>{greeting}</span>
            <button onClick={logout} className='pt-1'>Logout</button>
          </>
        ) : (
          <Link href="/login" className='pt-1'>Login/SignUp</Link>
        )}
        
          <Link href="/orderhistory" className='pt-1'>Track your orders</Link>
        
      </div>
    </div>
  );
};

export default MarqueeComponent;