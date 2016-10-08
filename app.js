/**
 * @fileoverview Entry point to notes app
 * @author Chris
 */

import Express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import reactViews from 'express-react-views'

const app = new Express()

// start db
import client from './models/db'

client.on('connect', () => {
  console.log('Connected')
})
client.on('error', (err) => {
  console.log(`Error: ${err}`)
})

let shutdown = (callback) => {
  console.log('Shutting down redis...')
  client.shutdown()
  callback()
}

process.on('SIGINT', () => {
  shutdown(() => {
    process.exit()
  })
})
process.once('SIGUSR2', () => {
  console.log('nodemon restart')
  shutdown(() => {
    process.kill(process.pid, 'SIGUSR2')
  })
})

// load route handlers
import * as routes from './util/loader'

// app setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', reactViews.createEngine())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(Express.static(path.join(__dirname, 'public')))

app.use('/', routes.index)
app.use('/notes', routes.notes)
app.use('/notebooks', routes.notebooks)
app.use('/editor', routes.editor)


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
