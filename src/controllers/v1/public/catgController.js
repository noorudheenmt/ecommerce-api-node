import * as commonController from "#utils/commonController.js";
import * as categoryService from "#services/v1/public/catgService.js";

// getCategories controller
export const getCategories = async (req, res, log) => {
  try {
    log("categoryController.getCategories execution started");
    const categories = await categoryService.getCategories(req.query, log);
    log("categoryController.getCategories execution completed");

    return commonController.sendSuccess(res, {
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getCategoryById controller
export const getCategoryById = async (req, res, log) => {
  try {
    const { id } = req.params;

    log("categoryService.getCategoryById execution started");
    const category = await categoryService.getCategoryById(id, log);
    log("categoryService.getCategoryById execution completed");

    return commonController.sendSuccess(res, {
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
