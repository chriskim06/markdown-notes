/**
 * @fileoverview Entry point to notes app
 * @author Chris
 */

let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

let app = express()

// connect to mongodb instance
let db = require('./models/db')

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
app.use('/editor', require('./routes/editor'))
// app.use('/update', require('./routes/update'))
// app.use('/preview', require('./routes/preview'))


/**
 * ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
});

// print stacktrace in dev but not in production
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    handleError(err, res, err.stack)
  })
} else {
  app.use((err, req, res, next) => {
    handleError(err, res, '')
  })
}

// Function that renders the error page
const handleError = (err, res, data) => {
  console.error(err.stack)
  res.status(err.status || 500)
  res.render('error', {
    statusCode: res.statusCode,
    message: err.message,
    err: data
  })
}

module.exports = app
