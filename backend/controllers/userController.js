const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check User Existense
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create New User
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Getting User By Email And Check For Existance
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  // Compare req Password With DB Hashed Password
  const unHashePassword = await bcrypt.compare(password, user.password);

  if (user && unHashePassword) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else if (!user || !unHashePassword) {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc Update user
// @route POST /api/users/update/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Hash New Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = {
    name: name,
    email: user.email,
    password: hashedPassword,
  };

  const updatedUser = await User.findOneAndUpdate(req.user.id, userData, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, updateUser };
