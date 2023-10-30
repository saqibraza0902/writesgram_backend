import mongoose from "mongoose";

export interface IUser {
  name: string;
  phone: number;
  country: string;
  city: string;
  email: string;
  profile?: string;
  password: string;
  verified: boolean;
  admin: boolean;
  desc: string;
  facebook: string;
  instagram: string;
  resetToken: string;
}

const userModel = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    profile: { type: String },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    resetToken: { type: String },
    desc: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("user", userModel);
export default User;
