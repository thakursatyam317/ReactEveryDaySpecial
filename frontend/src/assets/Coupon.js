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
    code: "20% off",
    discountType: "percentage", // or "flat"
    discountValue: 20, // 10%
    minimumAmount: 200,
    description: "Get 10% off on your  order now!",
  },
    {  
    code: "25% off",
    discountType: "percentage", // or "flat"
    discountValue: 25, // 10%
    minimumAmount: 300,
    description: "Get 10% off on your order!",
  },
    {
    code: "70% + 60% + 50% off",
    discountType: "percentage", // or "flat"
    discountValue: 94, // 10%
    minimumAmount: 3000,
    description: "Get 70% + 60% + 50% off  for your Birth day Special!",
  },

  
];

export default coupons;
