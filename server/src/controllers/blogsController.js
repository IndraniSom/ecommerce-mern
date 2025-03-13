import Blog from "../models/blog.js";
import { uploadToCloudinary } from "../routes/blogs.js";

export const createBlog = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Please upload Image also" });
    const file = req.file;
    const { title, slug, excerpt, content, category } = req.body;
    if (!title || !slug || !excerpt || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await uploadToCloudinary(file.path);
    if (result.message === "Fail") {
      return res.status(400).json({ message: "Failed to Upload Image" });
    }

    const blog = new Blog({
      author: req.user._id,
      title,
      excerpt,
      slug,
      content,
      image: result.url,
      category,
    });

    const createdBlog = await blog.save();
    res
      .status(201)
      .json({ blog: createdBlog, message: "Blog created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    const skip = (page - 1) * limit;
    let blogs = await Blog.find({}).skip(skip).limit(limit).populate("author");
    blogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      slug: blog.slug,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      author: blog.author.firstName + " " + blog.author.lastName,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);
    res.status(200).json({ blogs, totalBlogs, totalPages, currentPage: page });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let blog = await Blog.findOne({ slug }).populate("author");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog = {
      _id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      slug: blog.slug,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: blog.author.firstName + " " + blog.author.lastName,
    };
    res.status(200).json({ blog: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    let url = null;
    if (req.file) {
      const file = req.file;
      const result = await uploadToCloudinary(file.path);
      if (result.message === "Fail") {
        return res.status(400).json({ message: "Failed to Upload Image" });
      }
      url = result.url;
    }
    const { id } = req.params;
    const { title, slug, excerpt, content, category } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.title = title;
    blog.slug = slug;
    blog.excerpt = excerpt;
    blog.content = content;
    blog.category = category;
    if (url) {
      blog.image = url;
    }
    blog.updatedAt = new Date();
    const updatedBlog = await blog.save();
    res
      .status(200)
      .json({ blog: updatedBlog, message: "Blog updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
