import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import contactRoute from "./routes/contactRoute.js";
import subscriberRoute from "./routes/newsletterRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import subcategoryRoute from "./routes/subcategoryRoute.js";
import productRoute from "./routes/productRoute.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";

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
  res.json({ message: "Vastraa API is working!" });
});

app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subcategoryRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/subscribe", subscriberRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/products", productRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vastraa server is running on port ${PORT}`);
});
