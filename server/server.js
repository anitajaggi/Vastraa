import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vastraa server is running on port ${PORT}`);
});
