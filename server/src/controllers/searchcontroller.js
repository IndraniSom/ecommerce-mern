// searchController.js

import Product from '../models/product.js';

export const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
