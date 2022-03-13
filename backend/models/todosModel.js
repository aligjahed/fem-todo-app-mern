const mongoose = require("mongoose");

const todoModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id not found"],
      ref: "User",
    },
    todo: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoModel);
