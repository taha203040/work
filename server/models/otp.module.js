import mongoose from "mongoose";
import bcrypt from "bcrypt";
const OtpSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otpCode: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
  },
});

OtpSchema.pre("save", async function (next) {
  if (!this.isModified("otpCode")) return next();
  try {
    const hashedOtp = await bcrypt.hash(this.otpCode, 10);
    this.otpCode = hashedOtp;
    next();
  } catch (err) {
    next();
  }
});

const UsrOTPVer = mongoose.model("usrOTPVer", OtpSchema);
export default UsrOTPVer;
