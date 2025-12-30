import * as commonController from "#utils/commonController.js";
import * as adminOrderService from "#services/v1/admin/adminOrderService.js";

// getAllOrders controller
export const getAllOrders = async (req, res, log) => {
  try {
    log("adminOrderService.getAllOrders execution started");
    const result = await adminOrderService.getAllOrders(req.query, log);
    log("adminOrderService.getAllOrders execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateOrderStatus controller
export const updateOrderStatus = async (req, res, log) => {
  try {
    log("adminOrderService.updateOrderStatus execution started");
    const result = await adminOrderService.updateOrderStatus(
      req.params.id,
      req.body.status,
      log
    );
    log("adminOrderService.updateOrderStatus execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
