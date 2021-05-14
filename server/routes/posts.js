const route = require("express").Router();
const PostConfig = require("../database/models/PostConfig");
const serialize = require("../utils/serialize");

route.post("/posts", async (req, res) => {
  if (!req.user) return res.status(401).send({ message: "Unauthorized" });
  const { content, socket } = req.body;
  if (!content)
    return res
      .status(400)
      .send({ error: true, message: "Provide all details" });
  const post = await PostConfig.create({
    content,
    author: req.user,
    uploaded: new Date(),
  });
  const truePost = serialize.post(post);
  res.send(truePost);
  if (socket)
    req.useSocket.request(
      (socket) => socket.broadcast.emit("post", truePost),
      socket
    );
});

route.get("/posts", async (req, res) => {
  if (!req.user) return res.status(401).send({ message: "Unauthorized" });

  if (req.query.id) {
    return res.send(await getPostById());
  } else if (req.query.author) {
    return res.send(
      serialize.post(
        await PostConfig.find({ "author.id": req.query.author })
      ) || {}
    );
  }
  return res.send((await PostConfig.find({})).map(serialize.post));
});

async function getPostById(req) {
  try {
    return serialize.post(await PostConfig.find({ _id: req.query.id }));
  } catch (err) {
    return {};
  }
}

module.exports = route;
