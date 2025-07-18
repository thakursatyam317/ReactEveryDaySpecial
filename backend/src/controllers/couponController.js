import Coupon from "../models/couponModels.js";

// Create new coupon
export const createCoupon = async (req, res) => {
  try {
    const { name, code, description, discount, validTill } = req.body;

    const exists = await Coupon.findOne({ code });
    if (exists) return res.status(400).json({ message: 'Coupon code already exists' });

    const newCoupon = new Coupon({ name, code, description, discount, validTill });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
