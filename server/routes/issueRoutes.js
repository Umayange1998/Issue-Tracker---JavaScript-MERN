import express from "express";
import {
  addComment,
  createIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
} from "../controllers/issueController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create issue
router.post("/", createIssue);

// Get all issues
router.get("/", getAllIssues);

// Get single issue
router.get("/getissue/:id", getIssueById);

// Update issue
router.put("/update/:id", updateIssue);
// Delete issue
router.delete("/:id", authMiddleware, deleteIssue);

// add comment
router.post("/:id/comment", authMiddleware, addComment);

export default router;
