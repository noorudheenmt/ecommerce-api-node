import jwt from "jsonwebtoken";
import config from "#config/config.js";

// generate access token
export const generateAccessToken = (payload, log) => {
  try {
    log("Generating access token started");
    const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    log("Generating access token completed");
    return token;
  } catch (error) {
    log(error.stack, "error");
    throw new Error("Failed to generate access token");
  }
};

// generate refresh token
export const generateRefreshToken = (payload, log) => {
  try {
    log("Generating refresh token started");
    const token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    log("Generating refresh token completed");
    return token;
  } catch (error) {
    log(error.stack, "error");
    throw new Error("Failed to generate refresh token");
  }
};

// verify access token
export const verifyAccessToken = (token, log) => {
  try {
    if (log) log("Verifying access token started");
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    if (log) log("Verifying access token completed");
    return decoded;
  } catch (error) {
    if (log) log(error.stack, "error");
    throw new Error("Invalid or expired access token");
  }
};

// verify refresh token
export const verifyRefreshToken = (token, log) => {
  try {
    log("Verifying refresh token started");
    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    log("Verifying refresh token completed");
    return decoded;
  } catch (error) {
    log(error.stack, "error");
    throw new Error("Invalid or expired refresh token");
  }
};
