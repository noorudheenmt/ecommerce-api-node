import Joi from "joi";

// productIdParamSchema validation
export const productIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// addReview validation
export const addReviewSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().allow("").optional(),
});

// updateReview validation
export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().trim().allow("").optional(),
});

// reviewIdParamSchema validation
export const reviewIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
