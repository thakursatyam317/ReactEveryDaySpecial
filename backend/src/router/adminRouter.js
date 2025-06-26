// src/routes/adminRoutes.js
import express from 'express';
import {
  getAllUsers,
  deleteUser,
  promoteToAdmin,
} from '../controllers/adminController.js';
import {
  userProtect,
  isAdmin,
} from '../middleware/adminMiddleware.js'; // ✅ Correct middleware

const router = express.Router();

// 🔐 Protected Admin Routes
router.get('/users', userProtect, isAdmin, getAllUsers);         // Fetch all users
router.delete('/user/:id', userProtect, isAdmin, deleteUser);    // Delete a user
router.put('/promote/:id', userProtect, isAdmin, promoteToAdmin); // Promote user to admin

export default router;
