import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
//appconfig
const app = express();
const port = process.env.PORT;

//midleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

import userRouter from "./routes/userRoutes.js";
import issueRouter from "./routes/issueRoutes.js";

app.use("/user", userRouter);
app.use("/issue", issueRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
