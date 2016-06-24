const config = require('./config');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const resUtil = require('./app/utils/res-util');

const app = express();
const server = app.listen(config.port);

const router = require('./app/router');

// Connect to DB
mongoose.connect(config.mongo);

// Set app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((err, req, res, next) => {
  if (err.name === 'StatusError') {
    resUtil.error(res, err.message, err.status);
  } else {
    next(err);
  }
});

// Register router
app.use('/api', router);
app.use('/uploads', express.static('uploads'));

console.log('Server listen on ' + config.host + ':' + config.port);
