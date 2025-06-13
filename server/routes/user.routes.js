import { Router } from "express";

import { getUsers } from "../controllers/user.controllers.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();
import {updateUser , deleteUser} from "../controllers/user.controllers.js"
// Define a route to get user information

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize);

userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
