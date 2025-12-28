import Joi from "joi";

// updateRoleSchema validation
export const updateRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
});
