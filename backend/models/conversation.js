const mongoose = require("mongoose");

//model for conversations in chat
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", ConversationSchema);
