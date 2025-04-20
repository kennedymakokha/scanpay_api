import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  business_name: { type: String, required: true, unique: true },
  description: { type: String, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'vendor_tb'
  },
  state: {
    type: String,
    enum: ["active", "inactive",],
    default: "active"
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const BusinessModel = mongoose.model("business_tb", CategorySchema);
