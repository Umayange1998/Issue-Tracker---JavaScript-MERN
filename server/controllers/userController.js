import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const accessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

///register
export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const userCount = await userModel.countDocuments();

    let user;

    //  first user  auto create admin
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await userModel.create({
        email,
        fullName,
        password: hashedPassword,
        isRegistered: true,
        role: "admin",
      });

      return res.status(201).json({
        message: "First admin registered successfully",
      });
    }

    //  normal flow (invite-only )
    user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "You are not invited. Contact admin.",
      });
    }

    if (user.isRegistered) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.fullName = fullName;
    user.isRegistered = true;

    await user.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || !user.isRegistered) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = accessToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create user

export const createUserByAdmin = async (req, res) => {
  try {
    const { email, role } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      email,
      role,
      isRegistered: false,
    });

    res.status(201).json({
      message: "User invited successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
//delete user

export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ isRegistered: true })
      .select("fullName email role");

    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
