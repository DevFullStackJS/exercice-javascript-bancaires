const express = require('express');

const { list, listOneRib } = require('../controllers/operations');

const router = express.Router();

router
  .route('/')
  .get(list);

router
  .route('/:rib/:min/:max')
  .get((req, res) => listOneRib(req, res));

module.exports = router;
