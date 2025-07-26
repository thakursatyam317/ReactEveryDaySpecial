// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getUserCart);
router.delete("/remove/:cartItemId", removeFromCart);
router.put("/update/:cartItemId", updateQuantity);

export default router;
