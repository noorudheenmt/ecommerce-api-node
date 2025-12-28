import Joi from "joi";

// createProductSchema validation
export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  brand: Joi.string().allow(""),
  stock: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

// updateProductSchema validation
export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  stock: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

// productIdParamSchema validation
export const productIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});