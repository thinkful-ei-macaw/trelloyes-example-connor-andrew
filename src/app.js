require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
const cardRouter = require('./card/card-router');
const listRouter = require('./list/list-router');
const logger = require('./logger');

const app = express();

const morganOption = NODE_ENV === 'production'
  ? 'tiny'
  : 'common';

// standard middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// authentication middleware
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  // move to the next middleware
  next();
});

// Routes
app.use('/card', cardRouter);
app.use('/list', listRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  let message; // eslint-disable-line no-unused-vars
  if (NODE_ENV === 'production') {
    message = 'Server error';
  } else {
    console.log(error);
    message = error.message;
  }
  res.status(500).json({ error: error.message });
});

// if no route matches, return 404 with HTML page - Express default route

module.exports = app;