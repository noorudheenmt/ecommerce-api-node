import express from "express";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as categoryValidation from "#validations/v1/public/catgValidation.js";
import * as categoryController from "#controllers/v1/public/catgController.js";

const router = express.Router();

// get categories router
router.get(
  "/",
  validate.validateQuery(categoryValidation.getCategoriesSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "get-categories", "v1");
    log("API call started");
    try {
      log("categoryController.getCategories execution started");
      await categoryController.getCategories(req, res, log);
      log("categoryController.getCategories execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    } finally {
      log("API call ended");
    }
  }
);

// get category/:id router
router.get(
  "/:id",
  validate.validateParams(categoryValidation.getCategoryByIdSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "get-category-by-id", "v1");
    log("API call started");
    try {
      log("categoryController.getCategoryById execution started");
      await categoryController.getCategoryById(req, res, log);
      log("categoryController.getCategoryById execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    } finally {
      log("API call ended");
    }
  }
);

export default router;
