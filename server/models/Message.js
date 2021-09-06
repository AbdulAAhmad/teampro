const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      sender_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("message", MessageSchema);
