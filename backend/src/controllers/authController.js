import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "A user with that email already exists." });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ message: "A user with that username already exists." });
      }
      return res.status(409).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error in register controller", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found with that email." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getProfile controller", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

export async function updateProfile(req, res) {
  try {
    const { username, email } = req.body;
    if (!username && !email) {
      return res.status(400).json({ message: "At least one field (username or email) is required." });
    }
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      update,
      { new: true, runValidators: true, context: 'query' }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error in updateProfile controller", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new password are required." });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in changePassword controller", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
} 