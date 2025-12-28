import * as commonController from "#utils/commonController.js";
import * as userService from "#services/v1/public/userService.js";

// getProfile controller
export const getProfile = async (req, res, log) => {
  try {
    log("userService.getProfile execution started");
    const result = await userService.getProfile(req.user.userId, log);
    log("userService.getProfile execution completed");
    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateProfile controller
export const updateProfile = async (req, res, log) => {
  try {
    log("userService.updateProfile execution started");
    const result = await userService.updateProfile(req.user.userId, req.body, log);
    log("userService.updateProfile execution completed");
    return commonController.sendSuccess(res, {
      message: "Profile updated",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// getAddresses controller
export const getAddresses = async (req, res, log) => {
  try {
    log("userService.listAddresses execution started");
    const result = await userService.getAddresses(req.user.userId, log);
    log("userService.listAddresses execution completed");
    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// addAddress controller
export const addAddress = async (req, res, log) => {
  try {
    log("userService.addAddress execution started");
    const result = await userService.addAddress(req.user.userId, req.body, log);
    log("userService.addAddress execution completed");
    return commonController.sendSuccess(res, {
      message: "Address added",
      data: result,
    }, 201);
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// updateAddress controller
export const updateAddress = async (req, res, log) => {
  try {
    log("userService.updateAddress execution started");
    const result = await userService.updateAddress(
      req.user.userId,
      req.params.id,
      req.body,
      log
    );
    log("userService.updateAddress execution completed");
    return commonController.sendSuccess(res, {
      message: "Address updated",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// deleteAddress controller
export const deleteAddress = async (req, res, log) => {
  try {
    log("userService.deleteAddress execution started");
    await userService.deleteAddress(req.user.userId, req.params.id, log);
    log("userService.deleteAddress execution completed");
    return commonController.sendSuccess(res, {
      message: "Address deleted",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
