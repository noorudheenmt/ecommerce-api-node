// validateBody middleware
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ status: "error", message: error.details[0].message });
      }
      next();
    } catch (error) {
      console.log(error.stack);
      return res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };
};

// validateQuery middleware
export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.query, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ status: "error", message: error.details[0].message });
      }
      next();
    } catch (err) {
      console.log(err.stack);
      return res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
      });
    }
  };
};

// validateParams middleware
export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.params, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ status: "error", message: error.details[0].message });
      }
      next();
    } catch (err) {
      console.log(err.stack);
      return res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
      });
    }
  };
};

