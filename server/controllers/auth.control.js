import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } from "../config/env.js";
import { comparePass, hashPassword } from "../utils/hashing.js";
import transporter from "../config/nodemailer.js";
import { sendEmailOtp } from "../utils/emailSend.js";
import bcrypt from "bcrypt"
// Register a new user

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      res.status(400).json({ message: "All fields are required" });
    const existUser = await User.findOne({ email }).session(session);
    if (existUser)
      return res.status(400).json({ message: "User already exists" });

    const hashpass = await hashPassword(password);
    const newUser = await User.create([{ email, name, password: hashpass }], {
      session,
    });
    const token = jwt.sign({ id: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await sendEmailOtp({ email });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      msj: "USER Created successfuly",
      User: newUser[0],
      token,
      sucsess: true,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ msj: "All fields are required" });
    const userExist = await User.findOne({ email });
    if (!userExist) res.status(404).json({ msg: "User not found " });
    const isMatch = await comparePass(password, userExist.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: userExist._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production", // Use secure cookies in production
      sameSite: NODE_ENV === "production" ? "None" : "Lax", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/", // Important! Makes cookie available on all routes
    });

    res.status(200).json({
      msg: "Login successful",
      user: userExist,
      token,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
    next(err);
  }
};
// Logout user

//
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 0, // Set maxAge to 0 to delete the cookie
    });
    return res.status(200).json({ msg: "Logged out ", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
    next(error);
  }
};

export const checkCookie = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ authenticated: false, msg: "No token provided" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, user });
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ authenticated: false, msg: "Invalid token" });
  }
};

const checkOtp = async () => {
  try {
    const { otp } = req.body;
  // compare the otp with storedotp 
  const compare = await bcrypt.compare(otp , otpHashed)
  if(!compare) throw new Error("the OTP INVALID")
    
  } catch (error) {}
};
