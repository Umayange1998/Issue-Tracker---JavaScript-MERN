import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    fullName: {
      type: String,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },

    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
