'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext'; // Adjust the import path as necessary
import Link from 'next/link';
interface LoginForm {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password); // Call the login function from context
      setSuccess('User logged in successfully!');
      setError(null);
      router.push('/'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className=" p-8  w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <span className='text-black text-sm mb-5'>Don&apos;t have an account register here!<Link href="/register" className='pl-1 text-blue-600'>Register </Link></span>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
           
            
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="w-40  bg-secondary_color text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
