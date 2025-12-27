import * as authService from "#services/v1/authService.js";
import * as commonController from "#utils/commonController.js";

// Register controller
export const register = async (req, res, log) => {
  try {
    log("authService.register execution started");
    const result = await authService.register(req.body, log);
    log("authService.register execution completed");
    return commonController.sendSuccess(
      res,
      {
        message: "User registered",
        data: result,
      },
      201
    );
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Login controller
export const login = async (req, res, log) => {
  try {
    log("authService.login execution started");
    const result = await authService.login(req.body, log);
    log("authService.login execution completed");
    return commonController.sendSuccess(res, {
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Logout controller
export const logout = async (req, res, log) => {
  try {
    log("authService.logout execution started");
    await authService.logout(req.body, log);
    log("authService.logout execution completed");
    return commonController.sendSuccess(res, { message: "Logout successful" });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Refresh token controller
export const refreshToken = async (req, res, log) => {
  try {
    log("authService.refreshToken execution started");
    const tokens = await authService.refreshToken(req.body, log);
    log("authService.refreshToken execution completed");
    return commonController.sendSuccess(res, {
      message: "Token refreshed",
      data: tokens,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Forgot password controller
export const forgotPassword = async (req, res, log) => {
  try {
    log("authService.forgotPassword execution started");
    await authService.forgotPassword(req.body, log);
    log("authService.forgotPassword execution completed");
    return commonController.sendSuccess(res, {
      message: "Password reset email sent",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Reset password controller
export const resetPassword = async (req, res, log) => {
  try {
    log("authService.resetPassword execution started");
    await authService.resetPassword(req.body, log);
    log("authService.resetPassword execution completed");
    return commonController.sendSuccess(res, {
      message: "Password reset successfully",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
