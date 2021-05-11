const mongoose = require("mongoose");

const PostConfig = new mongoose.Schema(
  {
    author: {
      id: String,
      username: String,
    },
    content: String,
    uploaded: Date,
  },
  { collection: "PostConfig", typeKey: "$type" }
);

module.exports = mongoose.model("PostConfig", PostConfig);
