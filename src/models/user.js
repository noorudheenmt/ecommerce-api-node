import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiresAt: {
      type: Date,
      default: null,
    },
  },
  // adds createdAt & updatedAt fields
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
