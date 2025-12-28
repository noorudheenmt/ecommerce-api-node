
import User from "#models/user.js";

// updateUserRole service
export const updateUserRole = async (userId, newRole, log) => {
  try {
    log("User.findById started");
    const user = await User.findById(userId);
    log("User.findById completed");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.role = newRole;
    log("User.save started");
    const updatedUser = await user.save();
    log("User.save completed");

    return {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
