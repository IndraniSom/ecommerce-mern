"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MarkdownComp from "@/components/custom/markdown";

// Sample blog data - would be replaced by actual API call
type Blog = {
  _id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  image: string;
  content: string;
  slug: string;
  excerpt: string;
};

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blogs/" + slug,{
          credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle case where blog doesn't exist
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
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full flex flex-col gap-8 py-7 px-4 md:px-20 bg-background">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6"
          >
            ← Back to Blogs
          </Button>
        </div>
        {blog ? (
          <>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>By {blog.author}</span>
            </div>

            <div className="relative w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              {/* Replace with actual Image component once images are available */}
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover object-center w-full h-full"
              />
            </div>

            <article className="prose prose-lg max-w-none dark:prose-invert">
              <MarkdownComp>{blog.content}</MarkdownComp>
            </article>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Share this article
              </h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col items-center justify-center py-20 px-4">
              <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
              <p className="mb-8">
                The blog you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/blogs">
                <Button>Return to Blogs</Button>
              </Link>
            </div>
          </>
        )}

        {/* <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Related Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(blogsData)
              .filter((post) => post.slug !== slug)
              .slice(0, 3)
              .map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.id}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date}
                      </p>
                      <h4 className="font-bold mt-2 text-gray-800 dark:text-gray-200">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
