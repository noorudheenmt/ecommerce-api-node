import Joi from "joi";

// orderIdParamSchema validation
export const orderIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// updateOrderStatusSchema validation
export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED")
    .required(),
});
