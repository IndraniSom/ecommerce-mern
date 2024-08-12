// routes/productRoutes.js
import express from 'express';
import { 
  createProduct, 
  createProductByUserId, 
  updateProduct, 
  getUserUploadedProduct, 
  deleteProduct, 
  deleteProductByUserId, 
  getAllProducts,
  getProductsByCategory ,
  getProductById,
  getfeaturedProduct
} from '../controllers/productController.js';
import { searchProducts } from '../controllers/searchcontroller.js'; // Import the search controller

const router = express.Router();

router.post('/create', createProduct);  
router.post('/create/:userId', createProductByUserId);
router.put('/update/:productId', updateProduct);
router.get('/user/:userId', getUserUploadedProduct);
router.delete('/delete/:productId', deleteProduct);
router.delete('/delete/:userId/:productId', deleteProductByUserId);
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/id/:id',getProductById);
router.get('/featured', getfeaturedProduct); 
export default router;
