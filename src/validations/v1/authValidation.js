import Joi from "joi";

// Register validation
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Login validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Forgot password validation
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Reset password validation
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
