const bcrypt = require("bcryptjs");
const schema = require("../utils/schema");

const db = require("../../db/connection");
const createTokenSendResponse = require("../utils/createTokenSendResponse");

const users = db.get("users");
users.createIndex("username", { unique: true });

exports.loginCB = async function (req, res, next) {
  const throwError = (res) => {
    res.status(422);
    throw new Error("Unable to connect");
  };

  const { value, error } = schema.validate(req.body);
  try {
    if (!error) {
      const user = await users.findOne({ username: req.body.username });
      if (user && user.active) {
        const comparedPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (comparedPassword) {
          createTokenSendResponse(user, res, next);
        } else {
          throwError(res);
        }
      } else {
        throwError(res);
      }
    } else {
      throwError(res);
    }
  } catch (error) {
    next(error);
  }
};

exports.signupCB = async function (req, res, next) {
  const { value, error } = schema.validate(req.body);
  try {
    if (!error) {
      const user = await users.findOne({ username: req.body.username });
      if (!user) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = {
          username: req.body.username,
          password: hashedPassword,
          role: "user",
          active: true,
        };
        const insertedUser = await users.insert(newUser);
        createTokenSendResponse(insertedUser, res, next);
      } else {
        res.status(500);
        throw new Error("This username already exists");
      }
    } else {
      res.status(422);
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
