var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const partials = require("express-partials")
const methodOverride = require("method-override")
const session = require('express-session');

const checkSession = require("./middlewares/checkSession")
const checkCookie = require('./middlewares/checkCookie');

/* RUTAS */
const authRoutes = require("./routes/authentication.routes");
const otherRoutes = require("./routes/other.routes");


var app = express();

/* CONFIGS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials()) // MIDDLEWARE 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride("_method"))
app.use(session({ secret: "palabra secreta"}))

app.use(checkCookie)
app.use(checkSession)




/* ENRUTADORES */
app.use("/", otherRoutes);
app.use("/autenticacion", authRoutes);


module.exports = app;
