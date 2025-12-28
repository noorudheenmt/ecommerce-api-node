import * as commonController from "#utils/commonController.js";
import * as cartService from "#services/v1/public/cartService.js";

// getCart controller
export const getCart = async (req, res, log) => {
  try {
    log("cartService.getCart execution started");
    const result = await cartService.getCart(req.user.userId, log);
    log("cartService.getCart execution completed");

    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// addToCart controller
export const addToCart = async (req, res, log) => {
  try {
    log("cartService.addToCart execution started");
    const result = await cartService.addToCart(req.user.userId, req.body, log);
    log("cartService.addToCart execution completed");

    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateCartItem controller
export const updateCartItem = async (req, res, log) => {
  try {
    log("cartService.updateCartItem execution started");
    const result = await cartService.updateCartItem(
      req.user.userId,
      req.params.itemId,
      req.body.quantity,
      log
    );
    log("cartService.updateCartItem execution completed");

    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// removeCartItem controller
export const removeCartItem = async (req, res, log) => {
  try {
    log("cartService.removeCartItem execution started");
    const result = await cartService.removeCartItem(
      req.user.userId,
      req.params.itemId,
      log
    );
    log("cartService.removeCartItem execution completed");

    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// clearCart controller
export const clearCart = async (req, res, log) => {
  try {
    log("cartService.clearCart execution started");
    const result = await cartService.clearCart(req.user.userId, log);
    log("cartService.clearCart execution completed");

    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
