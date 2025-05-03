import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  phone_number: { type: String, required: true, unique: true },
  username: { type: String, },
  agent: { type: String, },
  fcmToken: { type: String, },
  activationCode: { type: String, },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "client",],
    default: "client"
  },
  activated: { type: Boolean, default: false },
  password: { type: String, required: true },
  // admin
  vendorName: { type: String, },
  fullname: { type: String, },
  bussines: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'admin_tb'
  },
  ID_No: { type: String, },
  amount: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },

}, { timestamps: true });
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("user_tb", UserSchema);
