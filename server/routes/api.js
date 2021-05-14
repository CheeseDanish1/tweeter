const route = require("express").Router();
const posts = require("./posts");
const UserConfig = require("../database/models/UserConfig")
const PostConfig = require("../database/models/PostConfig")
const serialize = require('../utils/serialize')

route.get("/user", (req, res) => {
  res.send({ user: req.user });
});

route.get("/user/:id", async (req, res) => {
  if (!req.user) return res.send({message: "Unauthorized"})
  const {id} = req.params
  if (!id) return res.send({message: "Need a valid id", error: true})
  let user;
  try {
    user = await UserConfig.findOne({_id: id}) 
  } catch (err) {}
  if (!user) return res.send({user: null})
  const posts = await PostConfig.find({"author.id": id})
  res.send({ user: {...serialize.user(user), posts: posts.map(p => serialize.post(p))} });
});

route.use("/posts", posts);
// route.delete("/posts", async (req, res) => {
//   await PostConfig.collection.deleteMany({});
//   console.log(await PostConfig.find({}));
// });

module.exports = route;
