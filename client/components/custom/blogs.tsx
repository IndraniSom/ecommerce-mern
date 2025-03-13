"use client";
import React from "react";
import Link from "next/link";
type Product = {
  _id: number;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  image: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}[];


type BlogsProps = {
  blogs: Product;
};

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {blogs?.map((blog) => (
      <Link href={`/blogs/${blog.slug}`} key={blog._id}>
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col bg-white dark:bg-gray-800">
          <div className="relative h-48 w-full">
            {/* Replace with actual Image component once images are available */}
            <img className="h-full w-full bg-cover" src={blog.image} alt={blog.title}/>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <h2 className="text-xl font-bold my-2 text-gray-800 dark:text-gray-200">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">
              {blog.excerpt}
            </p>
            <div className="mt-4">
              <span className="text-primary hover:underline font-medium">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  );
};

export default Blogs;
