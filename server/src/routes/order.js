import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderToPaid } from '../controllers/orderController.js';
import auth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', auth, createOrder);
router.get('/myorders', auth, getOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);


export default router;
