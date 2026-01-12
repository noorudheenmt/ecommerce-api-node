import Product from "#models/product.js";
import Wishlist from "#models/wishlist.js";

// getWishlist service
export const getWishlist = async (userId, query, log) => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    log("Wishlist.find execution started");
    const wishlist = await Wishlist.find({ user: userId })
      .select("-__v")
      .populate({
        path: "product",
        select: "-__v",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    log("Wishlist.find execution completed");

    log("Wishlist.countDocuments execution started");
    const total = await Wishlist.countDocuments({ user: userId });
    log("Wishlist.countDocuments execution completed");

    return {
      wishlist,
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

// addToWishlist service
export const addToWishlist = async (userId, productId, log) => {
  try {
    log("Product.findById execution started");
    const product = await Product.findById(productId);
    log("Product.findById execution completed");

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    log("Wishlist.create execution started");
    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });
    log("Wishlist.create execution completed");

    return {
      message: "Product added to wishlist",
      data: wishlist.toObject({ versionKey: false }),
    };
  } catch (error) {
    // handle duplicate key error (unique index)
    if (error.code === 11000) {
      const err = new Error("Product already exists in wishlist");
      err.statusCode = 409;
      throw err;
    }
    log(error.stack, "error");
    throw error;
  }
};

// removeFromWishlist service
export const removeFromWishlist = async (userId, productId, log) => {
  try {
    log("Wishlist.findOne execution started");
    const wishlist = await Wishlist.findOne({
      user: userId,
      product: productId,
    });
    log("Wishlist.findOne execution completed");

    if (!wishlist) {
      const err = new Error("Product not found in wishlist");
      err.statusCode = 404;
      throw err;
    }

    log("Wishlist.deleteOne execution started");
    await Wishlist.deleteOne({ _id: wishlist._id });
    log("Wishlist.deleteOne execution completed");

    return {
      message: "Product removed from wishlist",
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
