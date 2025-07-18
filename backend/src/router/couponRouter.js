import express from "express";
import { createCoupon, getAllCoupons, deleteCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.post("/create", createCoupon);
router.get("/all", getAllCoupons);
router.delete("/delete/:id", deleteCoupon);

export default router;
