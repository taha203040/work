import subscriptionRouter from "../routes/subscribtion.routes.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import { signIn , signUp , logout } from "../controllers/auth.control.js";
import conncetMongoDB from "../database/mongoDb.js";
import User from "../models/user.model.js"
export default { subscriptionRouter, authRouter, userRouter , signIn, signUp, logout , User };
