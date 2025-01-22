var express = require('express');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationRouter = require('./routes/reservations');



const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

var app = express();



app.use(cors({
    exposedHeaders: ['Authorization'],
    origin:'*'
}));


app.set('views', path.join(__dirname, './views'));
app.set('view engine','ejs');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);
app.use('/reservations', reservationRouter)

app.use(function(req, res,next) {
    res.status(500).json({name: 'API', version: '1.0', status: 500, message: 'internal_server_error'});
});



module.exports = app;
