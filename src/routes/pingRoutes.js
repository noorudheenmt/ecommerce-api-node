import express from "express";
import { createLogger } from "../utils/logger.js";

const router = express.Router();

// ping route
router.get("/ping", async (req, res) => {
  const log = createLogger("ping");
  log("API call started");

  try {
    log("Ping execution started");
    log(
      `Request: ${JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      })}`
    );

    log("Ping execution completed");
    log("API call ended");

    return res.status(200).json({
      status: "ok",
      time: new Date().toISOString(),
    });
  } catch (error) {
    log("Ping API failed", error);
    return res.status(500).json({ status: "error" });
  }
});

export default router;
