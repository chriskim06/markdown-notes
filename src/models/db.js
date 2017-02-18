/**
 * @fileoverview Mongoose initialization
 * @author Chris
 */

// Import the global schema definitions defined in the models
import './Note'
import './Notebook'

import { exec } from 'child_process'
import mongoose from 'mongoose'

// Starts the MongoDB server from within the application
exec('mongod --dbpath /usr/local/var/mongodb', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`)
  } else {
    console.log(`stdout: ${stdout}`)
  }
})

// Connect to the database
mongoose.connect('mongodb://localhost/notes')

// Use regular ES6 promises
mongoose.Promise = global.Promise

// Connection handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose: CONNECTED')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose: DISCONNECTED')
})
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose: ERROR - ${err}`)
})

// Function to stop MongoDB and Mongoose
const shutdown = () => {
  mongoose.connection.close(() => {
    exec(`mongo --eval "connect('localhost:27017/admin').shutdownServer()"`, () => {
      console.log('Disconnecting mongoose and stopping MongoDB')
      process.exit(0)
    })
  })
}

process.on('SIGINT', () => {
  shutdown()
})
process.on('uncaughtException', (err) => {
  console.error(err)
  shutdown()
})
