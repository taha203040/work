import transporter from "../config/nodemailer.js";
import usrOTPVer from "../models/otp.module.js";
import { EMAIL_SENDER } from "../config/env.js";
import dayjs from "dayjs";
import User from "../models/user.model.js";
import { generateOtpEmailTemplate } from "../utils/template.js";
export const sendEmailOtp = async ({ email }, user) => {
  try {
    const OTP = `${Math.floor(Math.random() * 9999)}`;
    const user = await User.findOne({ email });

    // Store the otp in the db
    const newOtp = await usrOTPVer.create({
      otpCode: OTP,
      user: user._id,
      expiredAt: dayjs().add(15, "minute").toDate(),
    });

    // Config the Emai before send it
    const mailOption = {
      from: EMAIL_SENDER,
      to: email,
      subject: "hi",
      html: generateOtpEmailTemplate(OTP, "Taha"),
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) return console.log(err, "Error sending email");
      console.log(info);
    });
    // await newOtp.save();
  } catch (err) {
    console.log("Error sending otp", err);
  }
};
