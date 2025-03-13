"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Blogs from "@/components/custom/blogs";

interface Blog {
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
}

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const blogsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/blogs?page=" + currentPage + "&limit=" + blogsPerPage,{
            credentials: "include"
          }
        );
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, blogsPerPage]);

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="w-full flex flex-col items-center justify-center py-20 px-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Loading
          </h1>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="w-full flex flex-col gap-10 py-7 px-4 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold font-Cinzel_Decorative text-gray-800 dark:text-gray-200 pt-5">
          Our Blogs
        </h1>

        {blogs.length > 0 ? (
          <Blogs blogs={blogs} />
        ) : (
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            No blogs found
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => paginate(index + 1)}
                className="px-4 py-2"
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogsPage;
