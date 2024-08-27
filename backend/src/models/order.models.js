import mongoose, { Schema } from "mongoose";

const orderShema = Schema({
  product: {
    type: Schema.Types.ObjectId(),
    ref: "Food",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
