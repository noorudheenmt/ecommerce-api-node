import express from "express";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as orderValidation from "#validations/v1/public/orderValidation.js";
import * as orderController from "#controllers/v1/public/orderController.js";

const router = express.Router();

// order router
router.post(
  "/",
  protect.verifyToken,
  validate.validateBody(orderValidation.createOrderSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "create-order", "v1");
    log("API call started");
    try {
      log("orderController.createOrder execution started");
      await orderController.createOrder(req, res, log);
      log("orderController.createOrder execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent) {
        res.status(500).json({ status: "error", message: error.message });
      }
    } finally {
      log("API call ended");
    }
  }
);

// order router
router.get("/", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "get-orders", "v1");
  log("API call started");
  try {
    log("orderController.getOrders execution started");
    await orderController.getOrders(req, res, log);
    log("orderController.getOrders execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } finally {
    log("API call ended");
  }
});

// order/:id router
router.get(
  "/:id",
  protect.verifyToken,
  validate.validateParams(orderValidation.orderIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "get-order-details", "v1");
    log("API call started");
    try {
      log("orderController.getOrderById execution started");
      await orderController.getOrderById(req, res, log);
      log("orderController.getOrderById execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent) {
        res.status(500).json({ status: "error", message: error.message });
      }
    } finally {
      log("API call ended");
    }
  }
);

// order/:id/cancel router
router.put(
  "/:id/cancel",
  protect.verifyToken,
  validate.validateParams(orderValidation.orderIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "cancel-order", "v1");
    log("API call started");
    try {
      log("orderController.cancelOrder execution started");
      await orderController.cancelOrder(req, res, log);
      log("orderController.cancelOrder execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent) {
        res.status(500).json({ status: "error", message: error.message });
      }
    } finally {
      log("API call ended");
    }
  }
);

export default router;
