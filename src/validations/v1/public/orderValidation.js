import Joi from "joi";

// createOrderSchema validation
export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string()
    .valid("COD", "ONLINE")
    .required(),
});

// orderIdParamSchema validation
export const orderIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
