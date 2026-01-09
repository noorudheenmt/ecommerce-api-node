import * as commonController from "#utils/commonController.js";
import * as reviewService from "#services/v1/public/reviewService.js";

// getProductReviews controller
export const getProductReviews = async (req, res, log) => {
  try {
    log("reviewService.getProductReviews execution started");
    const result = await reviewService.getProductReviews(
      req.params.id,
      req.query,
      log
    );
    log("reviewService.getProductReviews execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// addReview controller
export const addReview = async (req, res, log) => {
  try {
    log("reviewService.addReview execution started");
    const result = await reviewService.addReview(
      req.user.userId,
      req.body,
      log
    );
    log("reviewService.addReview execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateReview controller
export const updateReview = async (req, res, log) => {
  try {
    log("reviewService.updateReview execution started");
    const result = await reviewService.updateReview(
      req.user.userId,
      req.params.id,
      req.body,
      log
    );
    log("reviewService.updateReview execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// deleteReview controller
export const deleteReview = async (req, res, log) => {
  try {
    log("reviewService.deleteReview execution started");
    const result = await reviewService.deleteReview(
      req.user.userId,
      req.params.id,
      log
    );
    log("reviewService.deleteReview execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
