import Joi from "joi";

// createCategorySchema validation
export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  isActive: Joi.boolean().optional(),
});

// updateCategorySchema validation
export const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});
