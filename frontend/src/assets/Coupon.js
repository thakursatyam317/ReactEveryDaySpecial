// src/assets/coupons.js
const coupons = [
  {
    code: "WELCOME10",
    discountType: "percentage", // or "flat"
    discountValue: 10, // 10%
    minimumAmount: 200,
    description: "Get 10% off on your first order!",
  },
  {
    code: "FLAT50",
    discountType: "flat",
    discountValue: 50, // ₹50 off
    minimumAmount: 499,
    description: "₹50 off on orders above ₹499!",
  },
];

export default coupons;
