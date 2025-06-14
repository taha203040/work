import { Router } from "express";
import {
  signIn,
  signUp,
  logout,
  checkCookie,
  
} from "../controllers/auth.control.js";
import cookieParser from "cookie-parser";

const authRouter = Router();

authRouter.use(cookieParser());

authRouter.post("/login", signIn);
authRouter.post("/register", signUp);
authRouter.post("/logout", logout);
authRouter.get("/me", checkCookie);
// authRouter.post("/email/", verifyOtp);
export default authRouter;
