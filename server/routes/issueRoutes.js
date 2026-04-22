import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
} from "../controllers/issueController.js";

const router = express.Router();

// Create issue
router.post("/", createIssue);

// Get all issues
router.get("/", getAllIssues);

// Get single issue
router.get("/getissue/:id", getIssueById);

// Update issue
router.put("/update/:id", updateIssue);

export default router;
