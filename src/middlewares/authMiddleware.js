import * as jwt from "#utils/jwt.js";

// verifyToken middleware
export const verifyToken = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    // Verify token
    const token = authHeader.split(" ")[1];
    const response = jwt.verifyAccessToken(token, null);
    req.user = response;
    next();
  } catch (error) {
    console.log(error.stack);
    return res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
