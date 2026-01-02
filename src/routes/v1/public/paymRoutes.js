import express from "express";
import * as protect from "#middlewares/authMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as paymentController from "#controllers/v1/public/paymController.js";

const router = express.Router();

// create-order router
router.post("/create-order", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "create-payment-order", "v1");
  log("API call started");
  try {
    log("paymentController.createPaymentOrder execution started");
    await paymentController.createPaymentOrder(req, res, log);
    log("paymentController.createPaymentOrder execution completed");
  } catch (error) {
    log(error.stack, "error");
    res.status(500).json({ message: error.message });
  } finally {
    log("API call ended");
  }
});

// webhook router
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const log = commonController.logRequest(req, "razorpay-webhook", "v1");
    log("Webhook API call started");
    try {
      await paymentController.razorpayWebhook(req, res, log);
      log("Webhook processed successfully");
    } catch (error) {
      log(error.stack, "error");
      res.status(500).json({ message: error.message });
    } finally {
      log("Webhook API call ended");
    }
  }
);

export default router;
