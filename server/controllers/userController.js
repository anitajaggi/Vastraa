import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import jwtToken from "../utils/jwtToken.js";

// register user
export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  const exitstingUser = await UserModel.findOne({ email });
  if (exitstingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    email,
    phone,
    password: hashedPass,
  });

  try {
    await newUser.save();
    jwtToken(res, newUser._id);
    res
      .status(201)
      .json({ message: "User registration successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", success: false });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser || existingUser.status !== true) {
    return res.status(403).json({ message: "Account has been deactivated" });
  }

  const isPassMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPassMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  jwtToken(res, existingUser._id);
  return res.status(200).json({ message: "Login successful", success: true });
};

// Logout user
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.json({
    message: "Logged out successfully!",
    success: true,
  });
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ status: true });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

// get current user
export const currentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server issues!", success: false });
  }
};

// update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPass;
    }
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
