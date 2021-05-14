const route = require("express").Router();
const posts = require("./posts");

route.get("/user", (req, res) => {
  res.send({ user: req.user });
});

route.use("/posts", posts);
// route.delete("/posts", async (req, res) => {
//   await PostConfig.collection.deleteMany({});
//   console.log(await PostConfig.find({}));
// });

module.exports = route;
