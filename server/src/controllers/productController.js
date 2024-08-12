import Product from "../models/product.js";
import multer from "multer";

export const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    cta,
    rating,
    numReviews,
    reviews,
  } = req.body;
  if (
    !name ||
    !price ||
    !description ||
    !image ||
    !category ||
    !countInStock ||
    !cta
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = new Product({
    name,
    price,
    description,
    image,
    category,
    countInStock,
    cta,
    rating: rating || 0,
    numReviews: numReviews || 0,
    reviews: reviews || [],
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProductByUserId = async (res, req) => {
  try {
    const userId = req.params.userId;

    const { name, description, price } = req.body;

    const product = new Product({
      name,
      description,
      price,
      userId,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    cta,
    rating,
    numReviews,
    reviews,
  } = req.body;
  if (
    !name ||
    !price ||
    !description ||
    !image ||
    !category ||
    !countInStock ||
    !cta
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;
    product.cta = cta;
    product.rating = rating || 0;
    product.numReviews = numReviews || 0;
    product.reviews = reviews || [];

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserUploadedProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProductByUserId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* I added this function */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const products = await Product.find({ category });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getfeaturedProduct= async (req, res) => {
  
  try {
   
    const products = await Product.find().sort({ searchCount: -1 }).limit(2);
    res.json(products);
    console.log("No errors found");
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most searched products' });
  }

 };
