import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

import connectToDb from "./db.js";
import { addUser, findUser } from "./query.js";
import User from "./models/user.js";
const app = express();
const port = 3000;

const authenticateUserSignUp = async function (req, res, next) {
  const { username, password } = req.headers;
  try {
    await addUser(username, password);
    let token = jwt.sign(
      { username: username, password: password },
      process.env.JWT_SECRET
    );
    res.locals.token = token;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const authenticateUserSignIn = async function (req, res, next) {
  const { username, password } = req.headers;
  try {
    const user = await findUser(username);
    if (!user) {
      return res.status(403).send("user is not registered"); // Return here to send response and exit middleware
    }
    if (user.password !== password) {
      return res.status(403).send("incorrect password"); // Return here to send response and exit middleware
    }
    let token = jwt.sign(
      { username: username, password: password },
      process.env.JWT_SECRET
    );
    res.locals.token = token;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

app.post("/signin", authenticateUserSignIn, (req, res) => {
  res.status(200).json({
    message: "signin req successful",
    authorization: "Bearer " + res.locals.token,
  });
});

app.post("/signup", authenticateUserSignUp, (req, res) => {
  res.status(200).json({
    message: "signup req successful",
    authorization: "Bearer " + res.locals.token,
  });
});

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
