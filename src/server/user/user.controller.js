const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./user.model');

module.exports.check = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw Error('User not found', res);
  }

  next();
};

module.exports.create = async (req, res) => {
  // // validate the user
  // const { error } = registerValidation(req.body);
  // // throw validation errors
  // if (error) return res.status(400).json({ error: error.details[0].message });
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
  await User.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

module.exports.list = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

module.exports.update = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).exec();

  res.json(user);
};

module.exports.view = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // throw error when email is wrong
  if (!user) {
    return res.status(201).json({ error: 'Identifiants est incorrect.' });
  }

  // check for password correctness Le mot de passe ou identifiants est incorrect.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(201).json({ error: 'Le mot de passe est incorrect.' });
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
    },
  });
};
