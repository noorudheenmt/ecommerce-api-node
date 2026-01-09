import mongoose from "mongoose";
import Order from "#models/order.js";
import Review from "#models/review.js";
import Product from "#models/product.js";

// getProductReviews service
export const getProductReviews = async (productId, query, log) => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    log("Review.find execution started");
    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    log("Review.find execution completed");

    log("Review.countDocuments execution started");
    const total = await Review.countDocuments({ product: productId });
    log("Review.countDocuments execution completed");

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
      },
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// addReview service
export const addReview = async (userId, data, log) => {
  try {
    const { productId, rating, comment } = data;

    // check purchase
    log("Order.findOne execution started");
    const order = await Order.findOne({
      user: userId,
      status: "DELIVERED",
      "items.product": productId,
    });
    log("Order.findOne execution completed");

    if (!order) {
      const err = new Error("You must purchase the product before reviewing");
      err.statusCode = 403;
      throw err;
    }

    // check existing review
    log("Review.findOne execution started");
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });
    log("Review.findOne execution completed");

    if (existingReview) {
      const err = new Error("You have already reviewed this product");
      err.statusCode = 409;
      throw err;
    }

    // create review
    log("Review.create execution started");
    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment,
    });
    log("Review.create execution completed");

    // update product rating
    await updateProductRating(productId, log);

    return {
      message: "Review added successfully",
      data: review,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// updateReview service
export const updateReview = async (userId, reviewId, data, log) => {
  try {
    log("Review.findById execution started");
    const review = await Review.findById(reviewId);
    log("Review.findById execution completed");

    if (!review) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      throw err;
    }

    if (review.user.toString() !== userId) {
      const err = new Error("You are not allowed to update this review");
      err.statusCode = 403;
      throw err;
    }

    log("Review.updateOne execution started");
    await Review.updateOne(
      { _id: reviewId },
      {
        $set: {
          ...(data.rating && { rating: data.rating }),
          ...(data.comment !== undefined && { comment: data.comment }),
        },
      }
    );
    log("Review.updateOne execution completed");

    // update product rating
    await updateProductRating(review.product, log);

    return {
      message: "Review updated successfully",
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// deleteReview service
export const deleteReview = async (userId, reviewId, log) => {
  try {
    log("Review.findById execution started");
    const review = await Review.findById(reviewId);
    log("Review.findById execution completed");

    if (!review) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      throw err;
    }

    if (review.user.toString() !== userId) {
      const err = new Error("You are not allowed to delete this review");
      err.statusCode = 403;
      throw err;
    }

    log("Review.deleteOne execution started");
    await Review.deleteOne({ _id: reviewId });
    log("Review.deleteOne execution completed");

    // update product rating
    await updateProductRating(review.product, log);

    return {
      message: "Review deleted successfully",
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// Helper function to update product rating
const updateProductRating = async (productId, log) => {
  try {
    log("Review.aggregate execution started");
    const stats = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);
    log("Review.aggregate execution completed");

    const rating = stats[0]?.avgRating || 0;
    const totalReviews = stats[0]?.totalReviews || 0;

    log("Product.updateOne execution started");
    await Product.updateOne({ _id: productId }, { rating, totalReviews });
    log("Product.updateOne execution completed");
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
