import * as commonController from "#utils/commonController.js";
import * as pingService from "#services/v2/public/pingService.js";

// ping controller
export const ping = async (req, res, log) => {
  try {
    log("pingService.ping execution started");
    const result = pingService.ping(log);
    log("pingService.ping execution completed");
    return commonController.sendSuccess(res, {
      message: "Ping successful",
      data: result,
    });
  } catch (error) {
    log(error.stack, "error");
    return commonController.sendError(res, error);
  }
};
