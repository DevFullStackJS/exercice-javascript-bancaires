import express from 'express';

import { list, listOneRib } from '../controllers/operations';

const router = express.Router();

router
  .route('/')
  .get(list);

router
  .route('/:rib')
  .post((req, res) => listOneRib(req, res));

export default router;
