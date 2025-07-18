// models/Coupon.js
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discount: { type: String, required: true },
  validTill: { type: Date },
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
