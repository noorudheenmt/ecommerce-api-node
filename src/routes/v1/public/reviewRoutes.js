import express from "express";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as reviewController from "#controllers/v1/public/reviewController.js";
import * as reviewValidation from "#validations/v1/public/reviewValidation.js";

const router = express.Router();

// get reviews by product id
router.get(
  "/product/:id",
  validate.validateParams(reviewValidation.productIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "get-product-reviews", "v1");
    log("API call started");
    try {
      log("reviewController.getProductReviews execution started");
      await reviewController.getProductReviews(req, res, log);
      log("reviewController.getProductReviews execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// add review router
router.post(
  "/",
  protect.verifyToken,
  validate.validateBody(reviewValidation.addReviewSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "add-review", "v1");
    log("API call started");
    try {
      log("reviewController.addReview execution started");
      await reviewController.addReview(req, res, log);
      log("reviewController.addReview execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// update review router
router.put(
  "/:id",
  protect.verifyToken,
  validate.validateParams(reviewValidation.reviewIdParamSchema),
  validate.validateBody(reviewValidation.updateReviewSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-review", "v1");
    log("API call started");
    try {
      log("reviewController.updateReview execution started");
      await reviewController.updateReview(req, res, log);
      log("reviewController.updateReview execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// delete review router
router.delete(
  "/:id",
  protect.verifyToken,
  validate.validateParams(reviewValidation.reviewIdParamSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "delete-review", "v1");
    log("API call started");
    try {
      log("reviewController.deleteReview execution started");
      await reviewController.deleteReview(req, res, log);
      log("reviewController.deleteReview execution completed");
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
