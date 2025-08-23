import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subcategory: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: { type: String, unique: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);
