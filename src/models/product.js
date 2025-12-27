import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  // adds createdAt & updatedAt fields
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;