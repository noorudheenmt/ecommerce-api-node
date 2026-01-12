import Joi from "joi";

// productIdParamSchema validation
export const productIdParamSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});
