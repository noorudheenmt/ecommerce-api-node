import express from "express";
import * as admin from "#middlewares/adminMiddleware.js";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as orderValidation from "#validations/v1/admin/adminOrderValidation.js";
import * as adminOrderController from "#controllers/v1/admin/adminOrderController.js";

const router = express.Router();

// order router
router.get(
  "/",
  protect.verifyToken,
  admin.adminOnly,
  async (req, res) => {
    const log = commonController.logRequest(req, "admin-get-orders", "v1");
    log("API call started");
    try {
      log("adminOrderController.getAllOrders execution started");
      await adminOrderController.getAllOrders(req, res, log);
      log("adminOrderController.getAllOrders execution completed");
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

// order/:id/status router
router.put(
  "/:id/status",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateParams(orderValidation.orderIdParamSchema),
  validate.validateBody(orderValidation.updateOrderStatusSchema),
  async (req, res) => {
    const log = commonController.logRequest(
      req,
      "admin-update-order-status",
      "v1"
    );
    log("API call started");
    try {
      log("adminOrderController.updateOrderStatus execution started");
      await adminOrderController.updateOrderStatus(req, res, log);
      log("adminOrderController.updateOrderStatus execution completed");
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
