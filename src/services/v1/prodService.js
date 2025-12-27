import Product from "#models/product.js";
import Review from "#models/review.js";
import Category from "#models/category.js";

// getProducts service
export const getProducts = async (query, log) => {
  console.log("reached service");
  try {
    const { page = 1, limit = 10, sort = "-createdAt", category } = query;
    
    // filter
    const filter = { isActive: true };

    // filter by category
    if (category) {
      log("Category.findOne by slug started");
      const categoryExists = await Category.findOne({
        slug: category,
        isActive: true,
      });
      log("Category.findOne by slug completed");

      if (!categoryExists) {
        const err = new Error("Category not found");
        err.statusCode = 404;
        throw err;
      }

      filter.category = category;
    }

    const skip = (page - 1) * limit;

    log("Product.find started");
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .select("-__v");
    log("Product.find completed");
    console.log(products);
    log("Product.countDocuments started");
    const total = await Product.countDocuments(filter);
    log("Product.countDocuments completed");

    return {
      items: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// searchProducts service
export const searchProducts = async (query, log) => {
  try {
    const { keyword  } = query;

    // validate keyword
    if (!keyword ) {
      const err = new Error("Search keyword is required");
      err.statusCode = 400;
      throw err;
    }

    log("Product.search started");
    const products = await Product.find({
      isActive: true,
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
      ],
    }).select("-__v");
    log("Product.search completed");

    return products;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// getProductById service
export const getProductById = async (productId, log) => {
  try {
    log("Product.findById started");
    const product = await Product.findOne({
      _id: productId,
      isActive: true,
    }).select("-__v");
    log("Product.findById completed");

    // Check if product exists
    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    return product;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// getProductReviews service
export const getProductReviews = async (productId, log) => {
  try {
    log("Product existence check started");
    const product = await Product.findById(productId);
    log("Product existence check completed");

    // Check if product exists
    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    log("Review.find by product started");
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .populate("user", "username email")
      .select("-__v");
    log("Review.find by product completed");

    return reviews;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
