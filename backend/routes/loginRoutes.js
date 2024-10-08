const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validator = require("validator");

router.post("/", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Determine if the user entered a username or email
    let user;

    if (validator.isEmail(identifier)) {
      // Search by email
      user = await User.findOne({ email: identifier });
    } else {
      // Search by username
      user = await User.findOne({ username: identifier });
    }

    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
