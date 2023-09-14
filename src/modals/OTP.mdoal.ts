import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IOTP {
  user: mongoose.Schema.Types.ObjectId;
  code: number;
}
const OTPSchema = new Schema<IOTP>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    code: { type: Number, required: true },
  },
  { timestamps: true }
);
const OTP = mongoose.model<IOTP>('otp', OTPSchema, 'otp');
export default OTP;
