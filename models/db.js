/**
 * @fileoverview Mongoose initialization
 * @author Chris
 */

// Import the global schema definitions defined in the models
import './Note'
import './Notebook'

// Connect to the database
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/notes')

mongoose.connection.on('connected', () => {
  console.log('Mongoose: CONNECTED')
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose: DISCONNECTED')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose: ERROR - ' + err)
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('App process received SIGINT: disconnecting Mongoose connection')
    process.exit(0)
  })
})
