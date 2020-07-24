const { body, check } = require('express-validator');

const User = require('../models/users');

module.exports.usersValidatorUpdate = [
  body('username').isLength({ min: 3 }),
  body('rib').isLength({ min: 20 }),
];

module.exports.usersValidator = [
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  check('email').custom(email => User.findOne({ email }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    })),
  body('password').isLength({ min: 5 }),
  body('rib').isLength({ min: 20 }),
];
