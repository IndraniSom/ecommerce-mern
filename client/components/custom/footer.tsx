import React from 'react'
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-secondary_color mt-auto text-background font-Cinzel_Decorative py-10 bottom-0'>
      <div className='container mx-auto px-5'>
        <div className='flex flex-col md:flex-row justify-between items-center border-b-2 border-background pb-8'>
          <div className='flex flex-col items-center md:items-start mb-6 md:mb-0'>
            <h3 className='text-xl md:text-3xl mb-4'>Stay sustainable and Subscribe now.</h3>
            <div className='flex w-fit bg-white '> 
              <input type='email' placeholder='Enter your email' className='px-[2px] md:px-4 py-2 text-lg bg-white '/>
              <button className='bg-background text-black px-[2px] md:px-4 py-2 text-lg ml-2'>Subscribe</button>
            </div>
          </div>
          <div className='flex space-x-4'>
            <Link href='https://www.instagram.com/yourInstagramHandle' target='_blank' rel='noreferrer'>
              <FaInstagram className='h-8 w-8 hover:text-gray-700 transition duration-300'/>
            </Link>
            <Link href='https://www.linkedin.com/in/yourLinkedinHandle' target='_blank' rel='noreferrer'>
              <FaLinkedinIn className='h-8 w-8 hover:text-gray-700 transition duration-300'/>
            </Link>
            <Link href='https://twitter.com/yourTwitterHandle' target='_blank' rel='noreferrer'>
              <FaTwitter className='h-8 w-8 hover:text-gray-700 transition duration-300'/>
            </Link>
            <Link href='https://www.facebook.com/yourFacebookPage' target='_blank' rel='noreferrer'>
              <FaFacebookF className='h-8 w-8 hover:text-gray-700 transition duration-300'/>
            </Link>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center pt-8'>
          <div className='text-lg text-center md:text-left'>
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <Link href='/privacy-policy' className='hover:text-gray-700 transition duration-300'>
              Privacy Policy
            </Link>
            <Link href='/terms-of-service'className='hover:text-gray-700 transition duration-300'>
             Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
