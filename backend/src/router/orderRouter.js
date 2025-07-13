import express from 'express';
import { createOrder, getUserOrders , UpdateOrderStatus } from '../controllers/orderController.js';
import { userProtect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.post('/create', userProtect, upload.single('image'), createOrder);
router.get('/myorders', userProtect, getUserOrders);
router.put('/OrderStatus', userProtect, UpdateOrderStatus);

export default router;
