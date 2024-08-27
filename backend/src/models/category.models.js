import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
