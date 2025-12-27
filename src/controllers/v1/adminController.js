import * as userService from "#services/v1/adminService.js";
import * as commonController from "#utils/commonController.js";

// updateUserRole controller
export const updateUserRole = async (req, res, log) => {
  try {
    log("userService.updateUserRole started");
    const result = await userService.updateUserRole(
      req.params.id,
      req.body.role,
      log
    );
    log("userService.updateUserRole completed");

    return commonController.sendSuccess(res, {
      message: "User role updated successfully",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
