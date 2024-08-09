import React from 'react'

import { cn } from "@/utils/cn";
import { FaGoogle,FaArrowAltCircleLeft } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";


const page = () => {
  return (
    <div className='flex flex-col md:flex-row w-full bg-background min-h-screen pb-10'>
        <div className='flex flex-col pt-10 pl-0 md:pl-36'>
        <Link href='/' className="flex text-xl font-Poppins font-bold w-fit pb-10"> <FaArrowAltCircleLeft className="h-10 w-10"/><span className="pt-1 pl-3">Go Back Home</span> </Link> 
    <div className='flex-col justify-start'>
            <div className='font-Cinzel_Decorative text-5xl  text-text_black border-[0.5px] border-white/[0.2] pb-4 pl-10 md:pl-0 '>Shopping Bag</div>
             <div className='bg-white w-fit px-7 py-9 flex gap-2 md:gap-20 relative'> {/* Make sure the div is relative for absolute positioning of the close icon */}
      
      <Image src='/assets/blazer.png' alt='blazer' width={100} height={100}/>
      <div className='text-xl font-bold py-5'>Red Blazer for Women</div>
      
        <div className='flex items-center'>
       
      </div>
      
      <div className='text-xl font-bold py-5 pr-7'>1500Rs </div>
      
    </div>
  
            
            </div>
           
    </div>
         <div className="w-[50%] pl-7 md:pl-14 flex-col min-h-screen bg-background py-10 pr-10 ">
      
    <div className="flex w-fit">
    <div className='flex flex-col w-[20rem] h-[20rem] mr-0 md:mr-32 mt-10'>
                <div className='font-Cinzel_Decorative text-text_black  pb-4 w-20 pl-32  flex pt-5 '>Total</div>
                <hr className='bg-black w-56 h-[2px] text-black ml-12'/>
                <div className='font-Cinzel_Decorative text-text_black  pb-4 w-20 pl-12 flex pt-5 font-bold'>SubTotal<span className='pl-28 font-regular '>1500Rs</span></div>
                <hr className='bg-black w-56 h-[2px] text-black ml-12'/>
                <div className='font-Cinzel_Decorative text-text_black  pb-4 w-20 pl-12 flex pt-5 font-bold '>Delivery<span className='pl-28 font-regular '>1500Rs</span></div>
                <div className='w-full items-center justify-center flex pt-5'>
               <Link href='/payment'> <button className="px-5 w-40 py-2  border-2 border-black dark:border-white uppercase bg-secondary_color items-center justify-center text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
       Pay Now →
      </button>
      </Link>
      </div>
    </div>
    </div>
    </div>
    
    </div>
  )
}

export default page
