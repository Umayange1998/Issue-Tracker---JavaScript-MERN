import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: String,
      unique: true,
      required: true, // e.g. "#ISS-001"
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const issueModel = mongoose.model("Issue", issueSchema);
export default issueModel;
