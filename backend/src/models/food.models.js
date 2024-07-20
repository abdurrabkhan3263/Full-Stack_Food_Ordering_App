import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const foodSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

foodSchema.plugin(mongooseAggregatePaginate);

export const Foods = mongoose.model.Food || mongoose.model("Food", foodSchema);
