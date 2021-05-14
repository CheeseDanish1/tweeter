const mongoose = require("mongoose");

const UserConfig = new mongoose.Schema(
  {
    username: String,
    password: String,
    // followers: [{ username: String, id: String }],
    // following: [{ username: String, id: String }],
    // liked: [{ id: String, author: { username: String, id: String } }],
  },
  { collection: "UserConfig", typeKey: "$type" }
);

module.exports = mongoose.model("UserConfig", UserConfig);
