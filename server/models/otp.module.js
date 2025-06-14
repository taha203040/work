import mongoose from "mongoose";
import bcrypt from "bcrypt";
const OtpSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  otpCode: {
    type: String,
    required: true,
  },
  createAt: Date,
  expiredAt: Date,
});

OtpSchema.pre("save", async function () {
  const hashedOtp = await bcrypt.hash(this.otpCode, 10);
  this.otpCode = hashedOtp;
});

const UsrOTPVer = mongoose.model("usrOTPVer", OtpSchema);
export default UsrOTPVer;
