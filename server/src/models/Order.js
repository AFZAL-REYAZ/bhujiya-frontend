const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
    source: {
      type: String,
      enum: ["featured", "b2b", "product", "bestseller", "home", "other"],
      default: "other",
    },
    sourceLabel: {
      type: String,
      trim: true,
    },
    kind: {
      type: String,
      enum: ["quote", "order"],
      default: "quote",
    },
    product: {
      id: String,
      title: String,
      price: Number,
      quantity: String,
      unit: String,
      image: String,
    },
    requestedQty: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
    meta: {
      page: String,
      section: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

orderSchema.index({ createdAt: -1 });
orderSchema.index({ source: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
