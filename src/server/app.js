const bodyParser = require('body-parser');
// const cors = require('@robertoachar/express-cors');
var cors = require('cors')
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const { catchAll, notFound } = require('./error');

const app = express();
const userRouter = require('./user/user.router');
const ribRouter = require('./rib/rib.router');
const verifyToken = require("./validation/validate-token");

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../build')))
  .set('static', path.join(__dirname, 'static'))
app.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});

// (req, res) => {
//   const dbUrl = process.env. DB_CONNECT;
//   const TOKEN_SECRET = process.env.TOKEN_SECRET;
//   res.json({ message: 'It works!', dbUrl, TOKEN_SECRET });
// }

app.use('/api/users', userRouter);

app.use("/api/rib", verifyToken, ribRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
