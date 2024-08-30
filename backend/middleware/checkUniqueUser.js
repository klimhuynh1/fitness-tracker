const User = require("../models/User");

const checkUniqueUser = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    // Check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: "Server error" });
  }
};

module.exports = checkUniqueUser;
