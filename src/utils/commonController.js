import { createLogger } from "./logger.js";

// Log request helper
export const logRequest = (req, apiName, version) => {
  const log = createLogger(apiName, version);
  log(`Request URL: ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length) {
    log(`Request Body: ${JSON.stringify(req.body)}`);
  }
  return log;
};

// Success response
export const sendSuccess = (res, payload, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "ok",
    ...payload,
  });
};

// Error response
export const sendError = (res, error) => {
  const statusCode = error.statusCode || 500;
  
  return res.status(statusCode).json({
    status: "error",
    message: error.message || "Something went wrong",
  });
};
