import Joi from "joi";

// getCategoriesSchema validation
export const getCategoriesSchema = Joi.object({
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).optional().default(10),
  sort: Joi.string().optional().default("-createdAt"),
  name: Joi.string().optional(),
});

// getCategoryByIdSchema validation
export const getCategoryByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
