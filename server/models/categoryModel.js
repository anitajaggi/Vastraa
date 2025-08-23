import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    slug: { type: String, unique: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
