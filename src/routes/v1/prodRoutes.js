import express from "express";
import * as productController from "#controllers/v1/prodController.js";
import * as commonController from "#utils/commonController.js";
// import * as validate from "#middlewares/validate.js";
// import * as productValidation from "#validations/v1/productValidation.js";

const router = express.Router();

// products router
router.get("/", async (req, res) => {
  const log = commonController.logRequest(req, "get-products", "v1");
  log("API call started");
  try {
    log("productController.getProducts execution started");
    await productController.getProducts(req, res, log);
    log("productController.getProducts execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

// search router
router.get("/search", async (req, res) => {
  const log = commonController.logRequest(req, "search-products", "v1");
  log("API call started");
  try {
    log("productController.searchProducts execution started");
    await productController.searchProducts(req, res, log);
    log("productController.searchProducts execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

// :id router
router.get("/:id", async (req, res) => {
  const log = commonController.logRequest(req, "get-product", "v1");
  log("API call started");
  try {
    log("productController.getProductById execution started");
    await productController.getProductById(req, res, log);
    log("productController.getProductById execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

// :id/reviews router
router.get("/:id/reviews", async (req, res) => {
  const log = commonController.logRequest(req, "get-product-reviews", "v1");
  log("API call started");
  try {
    log("productController.getProductReviews execution started");
    await productController.getProductReviews(req, res, log);
    log("productController.getProductReviews execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

export default router;
