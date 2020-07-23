import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { validationResult } from 'express-validator';

import { errorMessage } from '../utils';
import constants from '../../config/constants';

// import User from '../models/users';

const { error_email, error_mdp, not_found } = constants;

const isValidID = _id => mongoose.Types.ObjectId.isValid(_id);

const User = require('../models/users');

export const check = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw Error('User not found', res);
  }
  next();
};

export const checkUser = async (id) => {
  if (isValidID(id)) {
    const user = await User.findById(id);
    return user;
  }
  return null;
};

export const create = async (req, res) => {
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

export const remove = async (req, res) => {
  const isFound = await checkUser(req.params.id);
  if (!isFound) {
    return res.status(404).json(errorMessage(not_found));
  }
  await User.findByIdAndRemove(req.params.id);
  res.json({ sucsess: true, _id: req.params.id });
};

export const list = async (_, res) => {
  const users = await User.find();

  res.json(users);
};

export const update = async (req, res) => {
  const isFound = await checkUser(req.params.id);
  if (!isFound) {
    return res.status(404).json(errorMessage(not_found));
  }
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).exec();

  res.json(user);
};

export const view = async (req, res) => {
  const user = await checkUser(req.params.id);
  console.log({ user });
  if (!user) {
    return res.status(404).json(errorMessage(not_found));
  }

  res.json(user);
};

export const login = async (req, res) => {
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
