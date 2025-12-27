import * as jwt from "#utils/jwt.js";

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
    req.user = response.userId;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};
