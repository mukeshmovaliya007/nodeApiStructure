const express = require('express');
const cors = require('cors');
const { engine } = require("express-handlebars");
require("./utils/handlebarHelpers")();
// create express server
const app = express();

// use middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
// local imports
const { PORT } = require('./configs/env.config');
const { PUBLIC_DIR } = require('./constants/file-directories.constant');
const { NOT_FOUND } = require('./constants/http-status-code.constant');
const { COMMON_MESSAGES } = require('./constants/messages.constant');
const apiHelper = require('./helpers/api.helper');


//serving static files without using public folder
app.use(express.static(PUBLIC_DIR));

// database connection
require('./configs/db-connection.config');

// import all the routes
app.use(require('./routes/index.route'));


app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set("view engine", ".hbs");

// import schedulers
require("./schedulers/index");

// import rabbitMQ listeners
require("./utils/rabbitMq/index");

// import index script
require('./scripts/index.script');

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "API Server is up and running.",
    data: {},
    meta: {},
    errors: []
  });
});


// catch 404 route and pass it to error handler
app.use((req, res, next) => {
  const error = new Error(COMMON_MESSAGES.ROUTE_NOT_EXISTS);
  error.status = NOT_FOUND;
  next(error);
});

// error handlers
app.use((err, req, res, next) => {
  apiHelper.failure(res, err.message, [], NOT_FOUND);
});

// start the server
app.listen(PORT, () => {
  console.info(`API Server is up and running at ${PORT}`);
});