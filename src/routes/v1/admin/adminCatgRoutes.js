import express from "express";
import * as admin from "#middlewares/adminMiddleware.js";
import * as protect from "#middlewares/authMiddleware.js";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as categoryValidation from "#validations/v1/admin/adminCatgValidation.js";
import * as categoryController from "#controllers/v1/admin/adminCatgController.js";

const router = express.Router();

// category router
router.post(
  "/",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateBody(categoryValidation.createCategorySchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "create-category", "v1");
    log("API call started");
    try {
      log("categoryController.createCategory execution started");
      await categoryController.createCategory(req, res, log);
      log("categoryController.createCategory execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// category router
router.put(
  "/:id",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateBody(categoryValidation.updateCategorySchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-category", "v1");
    log("API call started");
    try {
      log("categoryController.updateCategory execution started");
      await categoryController.updateCategory(req, res, log);
      log("categoryController.updateCategory execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// category router
router.delete(
  "/:id",
  protect.verifyToken,
  admin.adminOnly,
  async (req, res) => {
    const log = commonController.logRequest(req, "delete-category", "v1");
    log("API call started");
    try {
      log("categoryController.deleteCategory execution started");
      await categoryController.deleteCategory(req, res, log);
      log("categoryController.deleteCategory execution completed");
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
