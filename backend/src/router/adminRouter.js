import express from "express";
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// /api/admin/user (GET all users)
router.get("/user", getAllUsers);

// /api/admin/user/role/:id (PUT toggle role)
router.put("/user/role/:id", toggleUserRole);

// /api/admin/user/status/:id (PUT toggle status)
router.put("/user/status/:id", toggleUserStatus);

export default router;
