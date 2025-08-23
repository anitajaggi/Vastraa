import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Subscriber", newsletterSchema);
