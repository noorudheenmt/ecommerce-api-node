import Joi from "joi";

// getProductsSchema validation
export const getProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).optional().default(10),
  sort: Joi.string().optional(),
  category: Joi.string().optional(), 
});

// searchProductsSchema validation
export const searchProductsSchema = Joi.object({
  KeyboardEvent: Joi.string().min(1).required(), 
});

// productIdParamSchema validation
export const productIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// productReviewsParamSchema validation
export const productReviewsParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
