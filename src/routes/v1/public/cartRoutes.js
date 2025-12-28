import express from "express";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as cartValidation from "#validations/v1/public/cartValidation.js";
import * as cartController from "#controllers/v1/public/cartController.js";

const router = express.Router();

// cart router
router.get("/", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "get-cart", "v1");
  log("API call started");
  try {
    log("cartController.getCart execution started");
    await cartController.getCart(req, res, log);
    log("cartController.getCart execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
});

// cart router
router.post(
  "/",
  protect.verifyToken,
  validate.validateBody(cartValidation.addToCartSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "add-cart-item", "v1");
    log("API call started");
    try {
      log("cartController.addToCart execution started");
      await cartController.addToCart(req, res, log);
      log("cartController.addToCart execution completed");
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

// cart/:itemId router
router.put(
  "/:itemId",
  protect.verifyToken,
  validate.validateParams(cartValidation.cartItemParamSchema),
  validate.validateBody(cartValidation.updateCartSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-cart-item", "v1");
    log("API call started");
    try {
      log("cartController.updateCartItem execution started");
      await cartController.updateCartItem(req, res, log);
      log("cartController.updateCartItem execution completed");
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

// cart/:itemId router
router.delete(
  "/:itemId",
  protect.verifyToken,
  validate.validateParams(cartValidation.cartItemParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "remove-cart-item", "v1");
    log("API call started");
    try {
      log("cartController.removeCartItem execution started");
      await cartController.removeCartItem(req, res, log);
      log("cartController.removeCartItem execution completed");
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

// cart router
router.delete("/", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "clear-cart", "v1");
  log("API call started");
  try {
    log("cartController.clearCart execution started");
    await cartController.clearCart(req, res, log);
    log("cartController.clearCart execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } finally {
    log("API call ended");
  }
});

export default router;
