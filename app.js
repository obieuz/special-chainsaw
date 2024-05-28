var express = require('express');
var logger = require('morgan');

var app = express();

app.use(require("./middlewares/cors"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use("/products",require("./routes/products"));
app.use("/users",require("./routes/users"));

app.use(require("./middlewares/handleNotFound"));
app.use(require("./middlewares/handleGlobalError"));

module.exports = app;
