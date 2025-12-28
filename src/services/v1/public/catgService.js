import Category from "#models/category.js";

// getCategories service
export const getCategories = async (query, log) => {
  try {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sort = query.sort || "-createdAt";

    // Build filter
    let filter = { isActive: true };
    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }

    log("categoryService.getCategories execution started");
    const categories = await Category.find(filter)
      .select("-__v")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
    log("categoryService.getCategories execution completed");

    return categories;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// getCategoryById service
export const getCategoryById = async (id, log) => {
  try {
    log("categoryService.getCategoryById execution started");
    const category = await Category.findOne({
      _id: id,
      isActive: true,
    }).select("-__v");
    log("categoryService.getCategoryById execution completed");

    // Check if category exists
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }

    return category;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
