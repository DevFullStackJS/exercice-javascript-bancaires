const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const { errorMessage } = require('../utils');
const constants = require('../../config/constants');

// const User = require('../models/users');

const { error_email, error_mdp, not_found } = constants;

const isValidID = _id => mongoose.Types.ObjectId.isValid(_id);

const User = require('../models/users');

module.exports.check = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw Error('User not found', res);
  }
  next();
};

module.exports.checkUser = async (id) => {
  if (isValidID(id)) {
    const user = await User.findById(id);
    return user;
  }
  return null;
};

module.exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    ...req.body,
    password,
  });
  await user.save();
  res.json(user);
};

module.exports.remove = async (req, res) => {
  const isFound = await checkUser(req.params.id);
  if (!isFound) {
    return res.status(404).json(errorMessage(not_found));
  }
  await User.findByIdAndRemove(req.params.id);
  res.json({ sucsess: true, _id: req.params.id });
};

module.exports.list = async (_, res) => {
  const users = await User.find();

  res.json(users);
};

module.exports.update = async (req, res) => {
  const isFound = await checkUser(req.params.id);
  if (!isFound) {
    return res.status(404).json(errorMessage(not_found));
  }
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).exec();

  res.json(user);
};

module.exports.view = async (req, res) => {
  const user = await checkUser(req.params.id);
  console.log({ user });
  if (!user) {
    return res.status(404).json(errorMessage(not_found));
  }

  res.json(user);
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // throw error when email is wrong
  if (!user) {
    return res.status(201).json(errorMessage(error_email));
  }

  // check for password correctness Le mot de passe ou identifiants est incorrect.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(201).json(errorMessage(error_mdp));
  }

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      user: {
        username: user.username,
        rib: user.rib,
        email: user.email,
      },
    },
  });
};
