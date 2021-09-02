const User = require("../models/User");

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

module.exports = {
  getUsers,
  getUserFromId,
};
