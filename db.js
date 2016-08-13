/**
 * @fileoverview Mongoose initialization
 * @author Chris
 */

require('./models/Note');
require('./models/Notebook');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes');

mongoose.connection.on('connected', function() {
  console.log('Mongoose: CONNECTED');
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose: DISCONNECTED');
});

mongoose.connection.on('error', function(err) {
  console.error('Mongoose: ERROR - ' + err);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('App process received SIGINT: disconnecting Mongoose connection');
    process.exit(0);
  });
});
