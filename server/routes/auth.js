const router = require("express").Router();
const User = require("../database/models/UserConfig");
const { encrypt, encryptData, decrypt } = require("../utils/crypt");
const serialize = require("../utils/serialize");
const COOKIE_NAME = "authorization";

router.post("/local/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(200).send({
      message: "You must provide a username and a password",
      error: true,
    });
  const oldUser = await User.findOne({ username });
  if (oldUser)
    return res
      .status(200)
      .send({ error: true, message: "User already exists" });
  const encryptedPassword = encrypt(password);
  const user = {
    ...(await User.create({ username, password: encryptedPassword })),
  }._doc;
  const encryptedUser = encryptData(user, "1w");
  return res
    .status(200)
    .cookie(COOKIE_NAME, encryptedUser, { httpOnly: true })
    .send({ user: serialize.user(user), message: "Successfully signed up!" });
});

router.post("/local/logout", async (req, res) => {
  if (!req.user) return res.send({message: "Unauthorized"})

  res.status(200).clearCookie(COOKIE_NAME).send({ message: "Logout Success"})
});

router.post("/local/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(200).send({
      message: "You must provide a username and a password",
      error: true,
    });
  const oldUser = await User.findOne({ username });
  if (!oldUser)
    return res
      .status(200)
      .send({ error: true, message: "Could not find user" });

  const decryptedPass = decrypt(oldUser.password).toString();
  const encryptedUser = encryptData({ ...oldUser }._doc, "1w");
  if (decryptedPass == password)
    return res
      .status(200)
      .cookie(COOKIE_NAME, encryptedUser, { httpOnly: true })
      .send({
        message: "Successfully logged in!",
        user: serialize.user(oldUser),
      });
  return res.send({ message: "Incorect password", error: true });
});

module.exports = router;
