import express from "express";
import * as userController from "#controllers/v1/userController.js";
import * as commonController from "#utils/commonController.js";
import * as validate from "#middlewares/validate.js";
import * as userValidation from "#validations/v1/userValidation.js";
import * as protect from "#middlewares/authMiddleware.js";

const router = express.Router();

// get profile
router.get("/profile", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "get-profile", "v1");
  log("API call started");
  try {
    log("userController.getProfile execution started");
    await userController.getProfile(req, res, log);
    log("userController.getProfile execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

// update profile
router.put(
  "/profile",
  protect.verifyToken,
  validate.validateBody(userValidation.updateProfileSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-profile", "v1");
    log("API call started");
    try {
      log("userController.updateProfile execution started");
      await userController.updateProfile(req, res, log);
      log("userController.updateProfile execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// get addresses
router.get("/address", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "get-address", "v1");
  log("API call started");
  try {
    log("userController.getAddresses execution started");
    await userController.getAddresses(req, res, log);
    log("userController.getAddresses execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

// add address
router.post(
  "/address",
  protect.verifyToken,
  validate.validateBody(userValidation.addressSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "add-address", "v1");
    log("API call started");
    try {
      log("userController.addAddress execution started");
      await userController.addAddress(req, res, log);
      log("userController.addAddress execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// update address
router.put(
  "/address/:id",
  protect.verifyToken,
  validate.validateBody(userValidation.addressSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "update-address", "v1");
    log("API call started");
    try {
      log("userController.updateAddress execution started");
      await userController.updateAddress(req, res, log);
      log("userController.updateAddress execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// delete address
router.delete("/address/:id", protect.verifyToken, async (req, res) => {
  const log = commonController.logRequest(req, "delete-address", "v1");
  log("API call started");
  try {
    log("userController.deleteAddress execution started");
    await userController.deleteAddress(req, res, log);
    log("userController.deleteAddress execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

export default router;
