const User = require("../models/User");
const Message = require("../models/Message");
const { validateUser } = require("./Users");

const getMessagesForUser = async (user_id) => {
  const userIsValid = await validateUser(user_id);
  if (userIsValid) {
    const messages = await Message.find({ user_id });
    if (messages) {
      return messages;
    }
    return [];
  }
  return Promise.reject(new Error("Invalid User"));
};

const createMessage = async (sender_id, target_id, text) => {
  const senderIsValid = await validateUser(sender_id);
  const targetIsValid = await validateUser(target_id);

  if (senderIsValid && targetIsValid && text) {
    const newMessage = new Message({
      user_id: target_id,
      sender_id,
      text,
    });

    await newMessage.save();
    return newMessage;
  }
  return Promise.reject(new Error("Message not created"));
};

module.exports = {
  getMessagesForUser,
  createMessage,
};
