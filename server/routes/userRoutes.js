import express from "express";
import {
  registerUser,
  loginUser,
  createUserByAdmin,
  updateUser,
  deleteUser,
  getMe,
  getAllUsers,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.get("/all", getAllUsers);
// Admin
router.post("/create", authMiddleware, isAdmin, createUserByAdmin);
router.put("/update/:id", authMiddleware, isAdmin, updateUser);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

export default router;
