import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import config from "#config/config.js";
import Token from "#models/token.js";
import User from "#models/user.js";
import * as jwt from "#utils/jwt.js";
import * as sendEmail from "#utils/sendEmail.js";

// register service
export const register = async (data, log) => {
  try {
    const { username, email, password } = data;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    log("Hashing password started");
    const hashedPassword = await bcrypt.hash(password, 10);
    log("Hashing password completed");

    // create new user
    log("Creating new user started");
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    log("Creating new user completed");
    log(`User registered successfully: ${newUser._id}`);

    return {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// login service
export const login = async (data, log) => {
  try {
    const { email, password } = data;

    // find user
    log("User.findOne by email started");
    const user = await User.findOne({ email });
    log("User.findOne by email completed");

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 400;
      throw error;
    }

    // compare password
    log("Comparing password started");
    const isMatch = await bcrypt.compare(password, user.password);
    log("Comparing password completed");

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 400;
      throw error;
    }

    // generate tokens
    const payload = { userId: user._id, email: user.email };
    const accessToken = jwt.generateAccessToken(payload, log);
    const refreshToken = jwt.generateRefreshToken(payload, log);

    // set refresh token expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // store refresh token in DB
    log("Storing refresh token in DB started");
    await Token.create({ token: refreshToken, userId: user._id, expiresAt });
    log("Storing refresh token in DB completed");

    // log user id and tokens
    log(`User logged in successfully: ${user._id}`);
    log(`Access token: ${accessToken}`);
    log(`Refresh token: ${refreshToken}`);

    return { accessToken, refreshToken, userId: user._id };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// logout service
export const logout = async (data, log) => {
  try {
    const { token } = data;

    // validate token
    if (!token) {
      const error = new Error("Refresh token is required");
      error.statusCode = 400;
      throw error;
    }

    log("Invalidating refresh token started");
    await Token.deleteOne({ token });
    log("Invalidating refresh token completed");

    log("Refresh token invalidated");
    return { message: "Logged out successfully" };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// refresh token service
export const refreshToken = async (data, log) => {
  try {
    const { token } = data;

    // validate token
    if (!token) {
      const error = new Error("Refresh token is required");
      error.statusCode = 400;
      throw error;
    }

    log("Verifying refresh token started");
    const storedToken = await Token.findOne({ token });
    log("Verifying refresh token completed");

    if (!storedToken) {
      const error = new Error("Refresh token invalid or expired");
      error.statusCode = 401;
      throw error;
    }

    log("Decoding refresh token started");
    const decoded = jwt.verifyRefreshToken(token, log);
    log("Decoding refresh token completed");

    const payload = { userId: decoded.userId, email: decoded.email };
    log(`payload: ${JSON.stringify(payload)}`);

    // generate new tokens
    const newAccessToken = jwt.generateAccessToken(payload, log);
    const newRefreshToken = jwt.generateRefreshToken(payload, log);
    log(`newAccessToken: ${newAccessToken}`);
    log(`newRefreshToken: ${newRefreshToken}`);

    // set new refresh token expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // store new refresh token
    log("Storing new refresh token in DB started");
    await Token.create({
      token: newRefreshToken,
      userId: decoded.userId,
      expiresAt,
    });
    log("Storing new refresh token in DB completed");

    // delete old token from DB
    log("Deleting old refresh token from DB started");
    await Token.deleteOne({ token });
    log("Deleting old refresh token from DB completed");
    log(`Refresh token rotated for user: ${decoded.userId}`);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// forgot password service
export const forgotPassword = async (data, log) => {
  try {
    const { email } = data;

    // validate email
    if (!email) {
      const err = new Error("Email is required");
      err.statusCode = 400;
      throw err;
    }

    log("User.findOne by email started");
    const user = await User.findOne({ email });
    log("User.findOne by email completed");

    // check if user exists
    if (!user) {
      const err = new Error(
        "If an account with that email exists, you will receive a reset link"
      );
      err.statusCode = 200;
      throw err;
    }

    // generate reset token
    log("Generating reset token started");
    const resetToken = crypto.randomBytes(32).toString("hex");
    log("Generating reset token completed");

    // set token expiry
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // store reset token in user record
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = expiresAt;
    await user.save();

    // send reset email
    const resetUrl = `${
      config.FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    log(`Password reset URL: ${resetUrl}`);

    // load email template
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "forgotPassword.html"
    );

    // read template file
    let html = fs.readFileSync(templatePath, "utf-8");

    // replace placeholders
    html = html.replace(/{{\s*NAME\s*}}/g, user.username || "User");
    html = html.replace(/{{\s*RESET_URL\s*}}/g, resetUrl);

    // send email
    log("Sending password reset email started");
    await sendEmail.sendEmail(
      { to: email, subject: "Password Reset Request", html },
      log
    );
    log("Sending password reset email completed");

    return {
      message:
        "If an account with that email exists, you will receive a reset link",
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// reset password service
export const resetPassword = async (data, log) => {
  try {
    const { email, token, newPassword } = data;

    // validate input
    if (!email || !token || !newPassword) {
      const err = new Error("Email, token, and new password are required");
      err.statusCode = 400;
      throw err;
    }

    log("Finding user by email and reset token started");
    const user = await User.findOne({
      email,
      resetToken: token,
      resetTokenExpiresAt: { $gt: new Date() },
    });
    log("Finding user by email and reset token completed");

    // validate user and token
    if (!user) {
      const err = new Error("Invalid or expired token");
      err.statusCode = 400;
      throw err;
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // remove reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;

    // save updated user
    await user.save();

    log("Password reset successfully for user:", user.email);
    return { message: "Password has been reset successfully" };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
