import Joi from "joi";

// updateProfileSchema validation
export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email(),
});

// updateRoleSchema validation
export const updateRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
});

// addressSchema validation
export const addressSchema = Joi.object({
  fullname: Joi.string().required(),
  phone: Joi.string().required(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().allow(""),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().required(),
  country: Joi.string(),
  isDefault: Joi.boolean().default(false),
});
