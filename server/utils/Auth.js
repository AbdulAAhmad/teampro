const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { SECRET } = require("../config");

const User = require("../models/User");

const registerUser = async (userDetails, res) => {
  try {
    // Validate the email
    let emailAvailable = await validateEmail(userDetails.email);
    if (!emailAvailable) {
      return res.status(400).json({
        error: `Email already in use`,
        success: false,
      });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);

    // Create a new user
    const newUser = new User({
      name: userDetails.name,
      email: userDetails.email,
      password: hashedPassword,
    });

    await newUser.save();

    let token = jwt.sign(
      {
        id: newUser._id,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      id: newUser._id,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(201).json({
      ...result,
      message: "User registered",
      success: true,
    });
  } catch (err) {
    // implement logger function (winston)
    return res.status(500).json({
      error: "Unable to create account",
      success: false,
    });
  }
};

const signinUser = async (userDetails, res) => {
  let { email, password } = userDetails;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      error: "Invalid Email or Password",
      success: false,
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    let token = jwt.sign(
      {
        id: user._id,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      id: user._id,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Sign in successful",
      success: true,
    });
  } else {
    return res.status(403).json({
      error: "Invalid Email or Password",
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  registerUser,
  signinUser,
  userAuth,
};
