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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use('/api/users', userRouter);

app.use("/api/rib", verifyToken, ribRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
