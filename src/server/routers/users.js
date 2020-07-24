const express = require('express');
const catchErrors = require('express-catch-errors');

const { usersValidator, usersValidatorUpdate } = require('../validator');

const {
  create,
  remove,
  list,
  update,
  view,
  login,
} = require('../controllers/users');

const router = express.Router();

router
  .route('/')
  .get(catchErrors(list))
  .post(usersValidator, create);

router
  .route('/:id')
  .get(view)
  .put(usersValidatorUpdate, update)
  .delete(remove);

router.post('/login', (req, res) => login(req, res));

module.exports = router;
