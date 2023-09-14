import mongoose from 'mongoose';

export interface IUser {
  name: string;
  phone: number;
  country: string;
  city: string;
  email: string;
  password: string;
  verified: boolean;
}

const userModel = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userModel);
export default User;
