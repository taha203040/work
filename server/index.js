import express from "express";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscribtion.routes.js";
import userRouter from "./routes/user.routes.js";
import { PORT } from "./config/env.js";
import conncetMongoDB from "./database/mongoDb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notes.routes.js";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
); // Adjust the origin as needed
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/", notesRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await conncetMongoDB();
});
export default app;
