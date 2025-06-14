import transporter from "../config/nodemailer.js";
import usrOTPVer from "../models/otp.module.js";
import mongoose from "mongoose";
import { EMAIL_SENDER } from "../config/env.js";
export const sendEmailOtp = async ({ email }) => {
  try {
    const OTP = `${Math.floor(Math.random() + 9000)}`;

    const mailOption = {
      from: EMAIL_SENDER,
      to: email,
      subject: "hi",
      html: `<p>Enter ${OTP} in the app to verify your email address</p>`,
    };

    const newOtp = usrOTPVer.create({
      otpCode: OTP,
    });
    transporter.sendMail(mailOption, (err, info) => {
      if (err) return console.log(err, "Error sending email");
      console.log(info);
    });
    // await newOtp.save();
  } catch (err) {
    console.log("Error sending otp", err);
  }
};
