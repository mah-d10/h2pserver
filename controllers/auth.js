const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const secretForJWT =
  "SwuyyZ2wOOS27b4mwpJXTQBkFCFRAathMbV7qm9YyZQHAmGpesy/rZj0ByxWN58wyWhjkIPjuPbcN6YmPrDi1iDxab3lsmkjs/v8zG+q3IhU6dy5A+mSzY0PsB5Qd5cTRhViqh/LHMNNvPZ25zKV+3/nWZa22SEYwtuMmN0xgQ2ekwef5reNeLlCQN01gfrU+3qR3sMY1ITwSJRlucgAEBKzpTq4pI9l7II6TQWrvF0rnk73SOt4dvqvzvS5eGb2CUUEDa1WlAjDXdrDqiRQdZ1W7i1TWR7BctpF11lPsohRtLqKU211lE7zYSqnJ9Po8Epua4poZ5//cI1jlXSG2Q==";

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "user createrd.", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("wrong password.");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id,
        },
        secretForJWT,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "logged in.", token: token, userId: loadedUser._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
