import express from 'express';
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus
} from '../controllers/adminController.js';
import { adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', adminOnly, getAllUsers);
router.put('/users/userId/role', adminOnly, toggleUserRole);
router.put('/users/userId/status', adminOnly, toggleUserStatus);

export default router;