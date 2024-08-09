import React from 'react'
import { Navbar } from '@/components/custom/navbar'
import Home from '@/components/custom/home'
import Newlaunches from '@/components/custom/newlaunches'
import About from '@/components/custom/about'
import Footer from '@/components/custom/footer'
import Marquee from '@/components/custom/marquee'
import Blogs from '@/components/custom/blogs'
import Category from '@/components/custom/category'
import Featured from '@/components/custom/featured'
import { AuthProvider } from "@/Context/AuthContext";
const page = () => {
  return (
    <AuthProvider>
    <div className='min-h-screen w-full bg-background '>
      <Marquee/>
      <Navbar/>
      < div className="bg-grid-black/[0.2]">
      <Home/>
      <Category/>
      <Newlaunches />
      <Featured/>
      <Blogs/>
      <About/>
      <Footer/>
      </div>
    </div>
    </AuthProvider>
   
  )
}

export default page