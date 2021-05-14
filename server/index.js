require("dotenv").config({ path: `${__dirname}/.env` });
require("./database/connection");

const helmet = require("helmet");
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serialize = require("./utils/serialize");

const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { decryptData } = require("./utils/crypt");
const COOKIE_NAME = "authorization";
app.use(function (req, res, next) {
  const cookie = req.cookies[COOKIE_NAME] || req.headers[COOKIE_NAME];
  if (!cookie) return noUser();
  const data = decryptData(cookie);
  if (!data) noUser();
  req.user = serialize.user(data);
  return next();
  function noUser() {
    req.user = null;
    next();
  }
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
