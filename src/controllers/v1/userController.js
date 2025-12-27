import * as userService from "#services/v1/userService.js";
import * as commonController from "#utils/commonController.js";

// Get profile controller
export const getProfile = async (req, res, log) => {
  try {
    log("userService.getProfile execution started");
    const result = await userService.getProfile(req.user, log);
    log("userService.getProfile execution completed");
    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Update profile controller
export const updateProfile = async (req, res, log) => {
  try {
    log("userService.updateProfile execution started");
    const result = await userService.updateProfile(req.user, req.body, log);
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

// List addresses controller
export const getAddresses = async (req, res, log) => {
  try {
    log("userService.listAddresses execution started");
    const result = await userService.getAddresses(req.user, log);
    log("userService.listAddresses execution completed");
    return commonController.sendSuccess(res, { data: result });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};

// Add address controller
export const addAddress = async (req, res, log) => {
  try {
    log("userService.addAddress execution started");
    const result = await userService.addAddress(req.user, req.body, log);
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

// Update address controller
export const updateAddress = async (req, res, log) => {
  try {
    log("userService.updateAddress execution started");
    const result = await userService.updateAddress(
      req.user,
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

// Delete address controller
export const deleteAddress = async (req, res, log) => {
  try {
    log("userService.deleteAddress execution started");
    await userService.deleteAddress(req.user, req.params.id, log);
    log("userService.deleteAddress execution completed");
    return commonController.sendSuccess(res, {
      message: "Address deleted",
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
