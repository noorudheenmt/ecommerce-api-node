import Joi from "joi";

// addToCartSchema validation
export const addToCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

// updateCartSchema validation
export const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

// cartItemParamSchema validation
export const cartItemParamSchema = Joi.object({
  itemId: Joi.string().hex().length(24).required(),
});
