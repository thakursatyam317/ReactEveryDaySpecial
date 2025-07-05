import express from "express";
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
  orderSummary,
  orderUpdate,
} from "../controllers/adminController.js";

import Order from "../models/orderModels.js";

const router = express.Router();

// /api/admin/user (GET all users)
router.get("/user", getAllUsers);

// /api/admin/user/role/:id (PUT toggle role)
router.put("/user/role/:id", toggleUserRole);

// /api/admin/user/status/:id (PUT toggle status)
router.put("/user/status/:id", toggleUserStatus);

// router.get("/orders-summary", orderSummary);


router.patch("/orders/:id", orderUpdate);
export default router;
