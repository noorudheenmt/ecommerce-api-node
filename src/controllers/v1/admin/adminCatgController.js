import * as commonController from "#utils/commonController.js";
import * as categoryService from "#services/v1/admin/adminCatgService.js";

// createCategory controller
export const createCategory = async (req, res, log) => {
  try {
    log("categoryService.createCategory execution started");
    const result = await categoryService.createCategory(req.body, log);
    log("categoryService.createCategory execution completed");

    return commonController.sendSuccess(res, {
      message: "Category created successfully",
      data: result,
    }, 201); 
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateCategory controller
export const updateCategory = async (req, res, log) => {
  try {
    log("categoryService.updateCategory execution started");
    const result = await categoryService.updateCategory(
      req.params.id,
      req.body,
      log
    );
    log("categoryService.updateCategory execution completed");

    return commonController.sendSuccess(res, {
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// deleteCategory controller
export const deleteCategory = async (req, res, log) => {
  try {
    log("categoryService.deleteCategory execution started");
    await categoryService.deleteCategory(req.params.id, log);
    log("categoryService.deleteCategory execution completed");

    return commonController.sendSuccess(res, {
      message: "Category deleted successfully",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
