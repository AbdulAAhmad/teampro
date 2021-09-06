const User = require("../models/User");
const { Expo } = require("expo-server-sdk");

const getUsers = async (res) => {
  const users = await User.find({});
  if (users) {
    return res.status(200).json(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }))
    );
  }
  return res.status(404).json({
    error: "No users exist",
    success: false,
  });
};
const getUserFromId = async (id, res) => {
  const user = await User.findById(id);
  if (user) {
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  return res.status(404).json({
    error: "User does not exist",
    success: false,
  });
};

const updateToken = async (id, token, res) => {
  const user = await User.findById(id);
  if (!Expo.isExpoPushToken(token)) {
    return res.status(400).json({
      error: `Push token ${pushToken} is not a valid Expo push token`,
      success: false,
    });
  }
  user.pushToken = token;
  await user.save();

  if (user) {
    return res.status(200).json({
      success: true,
    });
  }

  return res.status(404).json({
    error: "User does not exist",
    success: false,
  });
};

const validateUser = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return true;
  }

  return false;
};

const userEnabledPushNotifications = async (id) => {
  const user = await User.findById(id);
  if (user) {
    if (user.pushToken) {
      console.log(user.pushToken);
      return true;
    }
    return false;
  }

  return false;
};

module.exports = {
  getUsers,
  getUserFromId,
  validateUser,
  updateToken,
  userEnabledPushNotifications,
};
