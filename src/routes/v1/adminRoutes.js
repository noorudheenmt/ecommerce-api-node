import express from "express";
import * as userController from "#controllers/v1/adminController.js";
import * as commonController from "#utils/commonController.js";
import * as validate from "#middlewares/validate.js";
import * as userValidation from "#validations/v1/userValidation.js";
import * as protect from "#middlewares/authMiddleware.js";
import * as admin from "#middlewares/adminMiddleware.js";

const router = express.Router();

// role router
router.put(
  "/:id/role",
  protect.verifyToken,
  admin.adminOnly,
  validate.validateBody(userValidation.updateRoleSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-user-role", "v1");
    log("API call started");
    try {
      log("userController.updateUserRole execution started");
      await userController.updateUserRole(req, res, log);
      log("userController.updateUserRole execution completed");
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
