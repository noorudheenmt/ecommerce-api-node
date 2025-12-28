import express from "express";
import * as validate from "#middlewares/validateMiddleware.js";
import * as commonController from "#utils/commonController.js";
import * as authValidation from "#validations/v1/public/authValidation.js";
import * as authController from "#controllers/v1/public/authController.js";

const router = express.Router();

// register router
router.post(
  "/register",
  validate.validateBody(authValidation.registerSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "register", "v1");
    log("API call started");
    try {
      log("authController.register execution started");
      await authController.register(req, res, log);
      log("authController.register execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// login router
router.post(
  "/login",
  validate.validateBody(authValidation.loginSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "login", "v1");
    log("API call started");
    try {
      log("authController.login execution started");
      await authController.login(req, res, log);
      log("authController.login execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// logout router
router.post(
  "/logout",
  validate.validateBody(authValidation.logoutSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "logout", "v1");
    log("API call started");
    try {
      log("authController.logout execution started");
      await authController.logout(req, res, log);
      log("authController.logout execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// refresh-token router
router.post(
  "/refresh-token",
  validate.validateBody(authValidation.refreshTokenSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "refresh", "v1");
    log("API call started");
    try {
      log("authController.refreshToken execution started");
      await authController.refreshToken(req, res, log);
      log("authController.refreshToken execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// forgot-password router
router.post(
  "/forgot-password",
  validate.validateBody(authValidation.forgotPasswordSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "forgot-password", "v1");
    log("API call started");
    try {
      log("authController.forgotPassword execution started");
      await authController.forgotPassword(req, res, log);
      log("authController.forgotPassword execution completed");
    } catch (error) {
      log(error.stack, "error");
      if (!res.headersSent)
        res.status(500).json({ status: "error", message: error.message });
    } finally {
      log("API call ended");
    }
  }
);

// reset-password router
router.post(
  "/reset-password",
  validate.validateBody(authValidation.resetPasswordSchema),
  async (req, res) => {
    const log = commonController.logRequest(req, "reset-password", "v1");
    log("API call started");
    try {
      log("authController.resetPassword execution started");
      await authController.resetPassword(req, res, log);
      log("authController.resetPassword execution completed");
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
