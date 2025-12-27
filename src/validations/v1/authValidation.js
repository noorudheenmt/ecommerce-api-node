import Joi from "joi";

// registerSchema validation
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// loginSchema validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// logoutSchema validation
export const logoutSchema = Joi.object({
  token: Joi.string().required(),
});

// refreshTokenSchema validation
export const refreshTokenSchema = Joi.object({
  token: Joi.string().required(),
});

// forgotPasswordSchema validation
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// resetPasswordSchema validation
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
