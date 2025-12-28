import express from "express";
import * as admin from "#middlewares/adminMiddleware.js";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as cloudinary from "#middlewares/uploadMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as productValidation from "#validations/v1/admin/adminProdValidation.js";
import * as productController from "#controllers/v1/admin/adminProdController.js";

const router = express.Router();

// product router
router.post(
  "/",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateBody(productValidation.createProductSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "create-product", "v1");
    log("API call started");
    try {
      log("productController.createProduct execution started");
      await productController.createProduct(req, res, log);
      log("productController.createProduct execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// product router
router.put(
  "/:id",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateParams(productValidation.productIdParamSchema),
  validate.validateBody(productValidation.updateProductSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-product", "v1");
    log("API call started");
    try {
      log("productController.updateProduct execution started");
      await productController.updateProduct(req, res, log);
      log("productController.updateProduct execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// product router
router.delete(
  "/:id",
  protect.verifyToken,
  validate.validateParams(productValidation.productIdParamSchema),
  admin.adminOnly,
  async (req, res) => {
    const log = commonController.logRequest(req, "delete-product", "v1");
    log("API call started");
    try {
      log("productController.deleteProduct execution started");
      await productController.deleteProduct(req, res, log);
      log("productController.deleteProduct execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// :id/images router
router.post(
  "/:id/images",
  protect.verifyToken,
  validate.validateParams(productValidation.productIdParamSchema),
  admin.adminOnly,
  (req, res, next) => {
    // uploadProductImages error handling
    cloudinary.uploadProductImages(req, res, (err) => {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    const log = commonController.logRequest(req, "upload-product-images", "v1");
    log("API call started");
    try {
      log("productController.uploadProductImages execution started");
      await productController.uploadProductImages(req, res, log);
      log("productController.uploadProductImages execution completed");
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
