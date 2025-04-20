import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  description: { type: String, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'admin_tb'
  },
  state: {
    type: String,
    enum: ["active", "inactive",],
    default: "active"
  },
  deletedAt: { type: Date, default: Date.now }
}, { timestamps: true });


export const Category = mongoose.model("category_tb", CategorySchema);
