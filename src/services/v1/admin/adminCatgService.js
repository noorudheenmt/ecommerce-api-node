import Category from "#models/category.js";

// createCategory service
export const createCategory = async (data, log) => {
  try {
    const category = new Category({
      name: data.name,
      slug: data.slug,
      isActive: true,
    });

    let savedCategory = await category.save();
    log("savedCategory:", JSON.stringify(savedCategory));

    // Remove __v
    savedCategory = savedCategory.toObject();
    delete savedCategory.__v;

    return {
      message: "Category created successfully",
      category: savedCategory,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// updateCategory service
export const updateCategory = async (id, data, log) => {
  try {
    log("categoryService.updateCategory execution started");
    let updatedCategory = await Category.findOneAndUpdate(
      { _id: id, isActive: true },
      { ...data },
      { new: true, runValidators: true }
    );
    log("categoryService.updateCategory execution completed");

    if (!updatedCategory) {
      const err = new Error("Category not found or inactive");
      err.statusCode = 404;
      throw err;
    }

    // Remove __v
    updatedCategory = updatedCategory.toObject();
    delete updatedCategory.__v;

    return {
      message: "Category updated successfully",
      category: updatedCategory,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

//deleteCategory service
export const deleteCategory = async (id, log) => {
  try {
    log("categoryService.deleteCategory execution started");
    const category = await Category.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
    log("categoryService.deleteCategory execution completed");

    if (!category) {
      const err = new Error("Category not found or already deleted");
      err.statusCode = 404;
      throw err;
    }

    return {
      message: "Category deleted successfully",
      categoryId: category._id,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};