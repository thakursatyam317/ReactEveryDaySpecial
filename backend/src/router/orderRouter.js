import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { userProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', userProtect, createOrder);
router.get('/myorders', userProtect, getUserOrders);

export default router;
