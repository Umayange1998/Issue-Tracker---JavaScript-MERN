import issueModel from "../models/issueModel.js";
import { generateIssueId } from "../utils/generateIssueId.js";

//  Create Issue
export const createIssue = async (req, res) => {
  try {
    const { title, status, priority, description, createdBy, assignedTo } =
      req.body;

    const issueId = await generateIssueId();

    const issue = await issueModel.create({
      issueId,
      title,
      status,
      priority,
      description,
      createdBy,
      assignedTo,
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await issueModel
      .find()
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Single Issue
export const getIssueById = async (req, res) => {
  try {
    const issue = await issueModel
      .findById(req.params.id)
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .populate("comments.commentedBy", "fullName email");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Issue
export const updateIssue = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const update = {};

    if (status) update.status = status;

    const updatedIssue = await issueModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: update,
          ...(assignedTo && {
            $addToSet: {
              assignedTo: assignedTo,
            },
          }),
        },
        { new: true },
      )
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email");

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Comment to Issue
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const issueId = req.params.id;
    const userId = req.user.id; // assuming authMiddleware sets req.user

    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const updatedIssue = await issueModel
      .findByIdAndUpdate(
        issueId,
        {
          $push: {
            comments: {
              comment,
              commentedBy: userId,
              commentedAt: new Date(),
            },
          },
        },
        { new: true },
      )
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .populate("comments.commentedBy", "fullName email");

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
