import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Gold",
        "Land",
        "US Stock",
        "US ETF",
        "Mutual Fund",
        "FD",
        "Bond",
        "Debt",
        "Post Office",
      ],
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
