import mongoose, { Schema } from "mongoose";

const CashSchema = new mongoose.Schema({
  amount: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const CashModel = mongoose.model("cash_tb", CashSchema);
