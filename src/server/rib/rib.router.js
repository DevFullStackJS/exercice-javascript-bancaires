const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { list, listOneRib, testApi } = require('./rib.controller');

router
  .route('/list')
  .get(catchErrors(list));

router
  .route('/test')
  .get(catchErrors(testApi));

router
  .route('/list/:rib')
  .post((req, res) => listOneRib(req, res));

module.exports = router;
