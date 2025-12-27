import * as productService from "#services/v1/adminProdService.js";
import * as commonController from "#utils/commonController.js";

// createProduct controller
export const createProduct = async (req, res, log) => {
  try {
    log("productService.createProduct execution started");
    const result = await productService.createProduct(req.body, log);
    log("productService.createProduct execution completed");

    return commonController.sendSuccess(res, {
      message: "Product created successfully",
      data: result,
    }, 201);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateProduct controller
export const updateProduct = async (req, res, log) => {
  try {
    log("productService.updateProduct execution started");
    const result = await productService.updateProduct(
      req.params.id,
      req.body,
      log
    );
    log("productService.updateProduct execution completed");

    return commonController.sendSuccess(res, {
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// deleteProduct controller
export const deleteProduct = async (req, res, log) => {
  try {
    log("productService.deleteProduct execution started");
    await productService.deleteProduct(req.params.id, log);
    log("productService.deleteProduct execution completed");

    return commonController.sendSuccess(res, {
      message: "Product deleted successfully",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// uploadProductImages controller
export const uploadProductImages = async (req, res, log) => {
  try {
    log("productService.uploadProductImages execution started");
    const result = await productService.uploadProductImages(
      req.params.id,
      req.files,  
      log
    );
    log("productService.uploadProductImages execution completed");

    return commonController.sendSuccess(res, {
      message: "Images uploaded successfully",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
