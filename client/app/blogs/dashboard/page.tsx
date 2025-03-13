"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: String;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();

        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message||"Failed to delete blog");

        // Remove deleted blog from state
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (isLoading)
    return (
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center p-8">Loading blogs...</div>
        <Footer />
      </div>
    );
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Management Dashboard</h1>
          <Link
            href="/blogs/dashboard/create"
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus /> Create New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No blogs found. Create your first blog!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Title</th>
                  <th className="py-3 px-4 border-b text-left">Summary</th>
                  <th className="py-3 px-4 border-b text-left">Created At</th>
                  <th className="py-3 px-4 border-b text-left">Updated At</th>
                  <th className="py-3 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{blog.title}</td>
                    <td className="py-3 px-4 border-b">
                      {blog.excerpt.substring(0, 50)}...
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <Link
                          href={`/blogs/dashboard/edit/${blog.slug}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={18} />
                        </button>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="text-green-500 hover:text-green-700"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
