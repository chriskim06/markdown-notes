/**
 * @fileoverview Entry point to notes app
 * @author Chris
 */

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

// connect to mongodb instance
var db = require('./db')

// app setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/notes', require('./routes/notes'))
app.use('/notebooks', require('./routes/notebooks'))
// app.use('/create', require('./routes/create'))
// app.use('/update', require('./routes/update'))
// app.use('/preview', require('./routes/preview'))


/**
 * ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// print stacktrace in dev but not in production
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    handleError(err, res, err.stack)
  })
} else {
  app.use(function(err, req, res, next) {
    handleError(err, res, '')
  })
}

// Function that renders the error page
function handleError(err, res, data) {
  console.error(err.stack)
  res.status(err.status || 500)
  res.render('error', {
    statusCode: res.statusCode,
    message: err.message,
    err: data
  })
}

module.exports = app
