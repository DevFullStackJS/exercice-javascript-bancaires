import express from 'express';
import catchErrors from 'express-catch-errors';

import { usersValidator, usersValidatorUpdate } from '../validator';

import {
  create,
  remove,
  list,
  update,
  view,
  login,
} from '../controllers/users';

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

export default router;
