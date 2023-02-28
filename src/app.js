const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file.routes.js');
const errorHandler = require('./middlewares/error-handler.middleware.js');
const app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/files', fileRoutes);
app.use(errorHandler);

module.exports = app;