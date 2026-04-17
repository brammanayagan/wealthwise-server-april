import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    // Asset name (TCS, Bitcoin, etc.)
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Asset type (controlled values)
    type: {
      type: String,
      required: true,
      enum: [
        "gold",
        "land",
        "us_stock",
        "us_etf",
        "mutual_fund",
        "fd",
        "bond",
        "debt",
        "post_office",
      ],
    },

    // Quantity
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    // Buy price
    buyPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Current price
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Ownership
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
