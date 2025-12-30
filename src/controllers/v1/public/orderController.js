import * as commonController from "#utils/commonController.js";
import * as orderService from "#services/v1/public/orderService.js";

// createOrder controller
export const createOrder = async (req, res, log) => {
  try {
    log("orderService.createOrder execution started");
    const result = await orderService.createOrder(req.user.userId, req.body, log);
    log("orderService.createOrder execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getOrders controller
export const getOrders = async (req, res, log) => {
  try {
    log("orderService.getOrders execution started");
    const result = await orderService.getOrders(req.user.userId, log);
    log("orderService.getOrders execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getOrderById controller
export const getOrderById = async (req, res, log) => {
  try {
    log("orderService.getOrderById execution started");
    const result = await orderService.getOrderById(
      req.user.userId,
      req.params.id,
      log
    );
    log("orderService.getOrderById execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// cancelOrder controller
export const cancelOrder = async (req, res, log) => {
  try {
    log("orderService.cancelOrder execution started");
    const result = await orderService.cancelOrder(
      req.user.userId,
      req.params.id,
      log
    );
    log("orderService.cancelOrder execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
