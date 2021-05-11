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
  console.log(1);
  const oldUser = await User.findOne({ username });
  if (oldUser)
    return res
      .status(200)
      .send({ error: true, message: "User already exists" });
  console.log(2);
  const encryptedPassword = encrypt(password);
  console.log(3);
  const user = {
    ...(await User.create({ username, password: encryptedPassword })),
  }._doc;
  console.log(4);
  const encryptedUser = encryptData(user, "1w");
  console.log(5);
  return res
    .status(200)
    .cookie(COOKIE_NAME, encryptedUser, { httpOnly: true })
    .send({ user: serialize.user(user), message: "Successfully signed up!" });
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

  // const encryptedPassword = encrypt(password);
  // const user = {
  //   ...(await User.create({ username, password: encryptedPassword })),
  // }._doc;
  // const encryptedUser = encryptData(user, "1w");
  // return res
  //   .cookie(COOKIE_NAME, encryptedUser, { httpOnly: true })
  //   .send(
  //     { user: serialize.user(user) },
  //     { message: "Successfully signed up!" }
  //   );
});

module.exports = router;
