const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // Schema validation for Email
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/.test(
            value
          );
        },
        message: (props) => `Password does not meet the required criteria`,
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
      this.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("Password comparison failed");
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
