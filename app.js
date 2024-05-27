var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const productsRouter=require("./routes/products");

var app = express();

app.use(require("./middlewares/cors"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use("/products",productsRouter);

app.use(require("./middlewares/handleNotFound"));
app.use(require("./middlewares/handleGlobalError"));

module.exports = app;
