import express from "express";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as wishlistController from "#controllers/v1/public/wishController.js";
import * as wishlistValidation from "#validations/v1/public/wishValidation.js";

const router = express.Router();

// get wishlist router
router.get(
  "/",
  protect.verifyToken,
  async (req, res) => {
    const log = commonController.logRequest(req, "get-wishlist", "v1");
    log("API call started");
    try {
      await wishlistController.getWishlist(req, res, log);
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// add wishlist router
router.post(
  "/:productId",
  protect.verifyToken,
  validate.validateParams(wishlistValidation.productIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "add-wishlist", "v1");
    log("API call started");
    try {
      await wishlistController.addToWishlist(req, res, log);
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// remove wishlist router
router.delete(
  "/:productId",
  protect.verifyToken,
  validate.validateParams(wishlistValidation.productIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "delete-wishlist", "v1");
    log("API call started");
    try {
      await wishlistController.removeFromWishlist(req, res, log);
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

export default router;
