const bodyParser = require('body-parser');
const passport = require('passport');
const errorHandle = require('./utils/errorHandler');

const cors = require('cors');
const express = require('express');
const app = express();

const indexRouts = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/", indexRouts);
app.use(function (req, res) {
  res.status(404)
      .json({
          error: 'Oops!!! No routes found.',
          code: 404
      });
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500)
      .json({
          error: errorHandle(error),
          code: error.code
      });
});

app.listen(3000);