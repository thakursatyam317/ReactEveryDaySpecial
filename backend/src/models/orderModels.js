import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: 
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    
    shippingAddress: {
      fullName: String,
      mobile: String,
      pincode: String,
      city: String,
      state: String,
      addressLine: String,
    },
    image: { type: String, default: "" }, // Optional field for profile picture URL
    //image: {type : String, required : true},
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    // orderStatus: { type: String, default: "Pending" },
    status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
    // paymentStatus: { type: String, default: 'Pending' }, // Paid, Pending, Failed
    paymentConfirmed: { type: Boolean, default: false }, // true/false

    // Optional additional field
    orderConfirmed: { type: Boolean, default: false }, // ✅ new field if you want it

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
