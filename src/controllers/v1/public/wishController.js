import * as commonController from "#utils/commonController.js";
import * as wishlistService from "#services/v1/public/wishService.js";

// getWishlist controller
export const getWishlist = async (req, res, log) => {
  try {
    log("wishlistService.getWishlist execution started");
    const result = await wishlistService.getWishlist(
      req.user.userId,
      req.query,
      log
    );
    log("wishlistService.getWishlist execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// addToWishlist controller
export const addToWishlist = async (req, res, log) => {
  try {
    log("wishlistService.addToWishlist execution started");
    const result = await wishlistService.addToWishlist(
      req.user.userId,
      req.params.productId,
      log
    );
    log("wishlistService.addToWishlist execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// removeFromWishlist controller
export const removeFromWishlist = async (req, res, log) => {
  try {
    log("wishlistService.removeFromWishlist execution started");
    const result = await wishlistService.removeFromWishlist(
      req.user.userId,
      req.params.productId,
      log
    );
    log("wishlistService.removeFromWishlist execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
