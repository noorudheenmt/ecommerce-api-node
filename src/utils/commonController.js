import { createLogger } from "./logger.js";

// logRequest utility
export const logRequest = (req, apiName, version) => {
  const log = createLogger(apiName, version);
  log(`Request URL: ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length) {
    log(`Request Body: ${JSON.stringify(req.body)}`);
  }
  return log;
};

// sendSuccess utility
export const sendSuccess = (res, payload, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "ok",
    ...payload,
  });
};

// sendError utility
export const sendError = (res, error) => {
  const statusCode = error.statusCode || 500;
  
  return res.status(statusCode).json({
    status: "error",
    message: error.message || "Something went wrong",
  });
};
