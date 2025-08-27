import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import jwtToken from "../utils/jwtToken.js";
import userModel from "../models/userModel.js";

// register user
export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
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

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Login Failed!", success: false });
  }
};

// Logout user
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  });

  res.json({
    message: "Logged out successfully!",
    success: true,
  });
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

// Get limited users
export const getLimitedUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await userModel
      .find({ status: true })
      .skip(skip)
      .limit(limit);

    const totalUsers = await userModel.countDocuments({ status: true });

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if new email already exists for another user
    if (req.body.email && req.body.email !== user.email) {
      const existingEmailUser = await userModel.findOne({
        email: req.body.email,
      });
      if (
        existingEmailUser &&
        existingEmailUser._id.toString() !== user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
    }

    // Check if new phone already exists for another user
    if (req.body.phone && req.body.phone !== user.phone) {
      const existingPhoneNum = await userModel.findOne({
        phone: req.body.phone,
      });

      if (
        existingPhoneNum &&
        existingPhoneNum._id.toString() !== user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Phone number already in use by another user" });
      }
    }

    // Prevent demoting the last admin
    const isDemotingAdmin =
      user.isAdmin &&
      req.body.hasOwnProperty("isAdmin") &&
      req.body.isAdmin === false;

    if (isDemotingAdmin) {
      const adminCount = await userModel.countDocuments({ isAdmin: true });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot demote the last remaining admin.",
        });
      }
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    if (req.body.hasOwnProperty("isAdmin")) {
      user.isAdmin = Boolean(req.body.isAdmin);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: "Cannot delete admin user" });
      }
      user.status = false;
      await user.save();
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete multiple users
export const deleteMultipleUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await userModel.updateMany(
      { _id: { $in: ids }, isAdmin: false },
      { status: false }
    );

    return res.status(200).json({
      message: "Users deleted successfully!",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Bulk delete failed" });
  }
};
