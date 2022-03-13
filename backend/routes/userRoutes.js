const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/", protect, updateUser);

module.exports = router;
