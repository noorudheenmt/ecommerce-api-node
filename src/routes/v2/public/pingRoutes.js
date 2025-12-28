import express from "express";
import * as commonController from "#utils/commonController.js";
import * as pingController from "#controllers/v2/public/pingController.js";

const router = express.Router();

// ping router
router.get("/", async (req, res) => {
  const log = commonController.logRequest(req, "ping", "v2");
  log("API call started");
  try {
    log("pingController.ping execution started");
    await pingController.ping(req, res, log);
    log("pingController.ping execution completed");
  } catch (error) {
    log(error.stack, "error");
    if (!res.headersSent)
      res.status(500).json({ status: "error", message: error.message });
  } finally {
    log("API call ended");
  }
});

export default router;
