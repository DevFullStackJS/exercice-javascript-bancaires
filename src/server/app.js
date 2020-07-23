import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDocument, options } from './swagger';

const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const { catchAll, notFound } = require('./error');

const app = express();
const userRouter = require('./user/user.router');
const ribRouter = require('./rib/rib.router');
const verifyToken = require('./validation/validate-token');

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../build')))
  .set('static', path.join(__dirname, 'static'));
app.get('/', (_, res) => {
  res.json({ message: 'It works!' });
});

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument, false, options, '.swagger-ui .topbar { background-color: red }'));

app.use('/api/users', userRouter);

app.use('/api/rib', verifyToken, ribRouter);

app.use('/api/ribs', verifyToken, ribRouter);

app.use(notFound);

app.use(catchAll);

module.exports = app;
