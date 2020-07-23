import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';

import { swaggerDocument, options } from './swagger';

// route
import usersRoute from './routers/users';
import operationsRouter from './routers/opetations';

import verifyToken from './middleware/auth';
import { catchAll, notFound } from './validator/error';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../build'))).set('static', path.join(__dirname, 'static'));
app.get('/', (_, res) => {
  res.json({ message: 'It works!' });
});

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument, false, options, '.swagger-ui .topbar { background-color: red }'));

app.use('/api/users', usersRoute);

app.use('/api/operations', verifyToken, operationsRouter);

app.use(notFound);

app.use(catchAll);

module.exports = app;
