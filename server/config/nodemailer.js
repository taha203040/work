import nodeMailer from "nodemailer";
import { EMAIL_PASS, EMAIL_SENDER } from "./env.js";
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_PASS,
  },
});

export default transporter;
