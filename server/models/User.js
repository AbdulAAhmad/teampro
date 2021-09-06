const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    pushToken: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
