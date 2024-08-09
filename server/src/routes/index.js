import { Router } from 'express';
import AuthRouter from './auth.js';
import ProductRouter from './product.js';
import OrderRouter from './order.js';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', ProductRouter);
router.use('/order', OrderRouter);


export default router;
