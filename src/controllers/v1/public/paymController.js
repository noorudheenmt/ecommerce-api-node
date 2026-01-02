import * as commonController from "#utils/commonController.js";
import * as paymentService from "#services/v1/public/paymService.js";

// createPaymentOrder controller
export const createPaymentOrder = async (req, res, log) => {
  try {
    log("paymentService.createPaymentOrder execution started");
    const result = await paymentService.createPaymentOrder(
      req.user.userId,
      log
    );
    log("paymentService.createPaymentOrder execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// razorpayWebhook controller
export const razorpayWebhook = async (req, res, log) => {
  try {
    log("paymentService.handleWebhook execution started");
    const result = await paymentService.handleWebhook(req, log);
    log("paymentService.handleWebhook execution completed");
    return commonController.sendSuccess(res, result);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
