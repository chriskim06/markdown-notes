/**
 * @fileoverview
 * @author Chris
 */

var mongoose = require('mongoose');

var note = new mongoose.Schema({
  title: String,
  content: String,
  notebook: String,
  updated: { type: Date, default: Date.now() }
});

mongoose.model('Notes', note);
// mongoose.connect('mongodb://localhost/notes');
