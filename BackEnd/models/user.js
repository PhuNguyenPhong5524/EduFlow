import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetOtp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    }

  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
