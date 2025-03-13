"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import MarkdownComp from "@/components/custom/markdown";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  excerpt: string;
  slug: string;
  image?: File | string;
  createdAt: Date;
}

export default function EditBlog() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewContent, setPreviewContent] = useState<boolean>(false);
  const params = useParams();
  const slug = params.slug as string;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Blog>({
    defaultValues: {
      title: "",
      content: "",
      category: "Fashion",
      excerpt: "",
      slug: "",  
    },
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs/" + slug);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setValue("_id", data.blog._id);
        setValue("title", data.blog.title);
        setValue("content", data.blog.content);
        setValue("category", data.blog.category);
        setValue("excerpt", data.blog.excerpt);
        setValue("slug", data.blog.slug);
        setImagePreview(data.blog.image);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ["Fashion", "Food", "Business", "Other"];

  const generateExcerpt = (
    content: string,
    maxLength: number = 150
  ): string => {
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    if (plainText.length <= maxLength) return plainText;
    const truncated = plainText.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex === -1
      ? truncated + "..."
      : truncated.substring(0, lastSpaceIndex) + "...";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: Blog) => {
    // Generate a URL-friendly slug from the title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("content", formData.content);
    blogData.append("category", formData.category);
    blogData.append("slug", slug);
    blogData.append("excerpt", generateExcerpt(formData.content));
    if (selectedImage) blogData.append("image", selectedImage);

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/blogs/update/" + formData._id, {
        method: "POST",
        body: blogData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      router.push("/blogs/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Update Blog</h1>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/blogs/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue="Fashion"
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label className="px-2" htmlFor="content">Content</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPreviewContent(!previewContent)}
              >
                {previewContent ? "Edit" : "Preview"}
              </Button>

              {previewContent ? (
                <div className="border border-gray-200 p-4 rounded-lg h-[500px] overflow-y-scroll">
                  <MarkdownComp>{watch("content")}</MarkdownComp>
                </div>
              ) : (
                <div className="">
                  <Textarea
                    id="content"
                    rows={12}
                    placeholder="Write your blog content here"
                    {...register("content", {
                      required: "Content is required",
                      minLength: {
                        value: 50,
                        message: "Content must be at least 50 characters",
                      },
                    })}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm">
                      {errors.content.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Blog Image</Label>
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto max-h-48 object-contain"
                  />
                ) : (
                  <p className="text-center mt-2 text-sm text-gray-500">
                    Click to upload an image
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
