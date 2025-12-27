// adminOnly middleware
export const adminOnly = (req, res, next) => {
  try {
    // Must be authenticated
    if (!req.user) {
      const err = new Error("Authentication required");
      err.statusCode = 401;
      throw err;
    }

    // Must be admin
    if (req.user.role !== "admin") {
      const err = new Error("Admin access required");
      err.statusCode = 403;
      throw err;
    }

    // Allowed
    next();
  } catch (error) {
    console.log(error.stack);
    return res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
