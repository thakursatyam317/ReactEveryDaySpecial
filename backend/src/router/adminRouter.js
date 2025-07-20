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

router.get("/user", getAllUsers);


router.put("/user/role/:id", toggleUserRole);

router.put("/user/status/:id", toggleUserStatus);

router.patch("/orders/:id", orderUpdate);
export default router;
