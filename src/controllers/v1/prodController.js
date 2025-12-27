import * as productService from "#services/v1/prodService.js";
import * as commonController from "#utils/commonController.js";

// getProducts controller
export const getProducts = async (req, res, log) => {
  try {
    log("productService.getProducts execution started");
    const result = await productService.getProducts(req.query, log);
    log("productService.getProducts execution completed");

    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// searchProducts controller
export const searchProducts = async (req, res, log) => {
  try {
    log("productService.searchProducts execution started");
    const result = await productService.searchProducts(req.query, log);
    log("productService.searchProducts execution completed");

    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getProductById Controller
export const getProductById = async (req, res, log) => {
  try {
    log("productService.getProductById execution started");
    const result = await productService.getProductById(req.params.id, log);
    log("productService.getProductById execution completed");

    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getProductReviews Controller
export const getProductReviews = async (req, res, log) => {
  try {
    log("productService.getProductReviews execution started");
    const result = await productService.getProductReviews(
      req.params.id,
      log
    );
    log("productService.getProductReviews execution completed");

    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
