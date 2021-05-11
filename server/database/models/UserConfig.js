const mongoose = require("mongoose");

const UserConfig = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: "UserConfig", typeKey: "$type" }
);

module.exports = mongoose.model("UserConfig", UserConfig);
