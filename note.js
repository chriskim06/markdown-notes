/**
 * @fileoverview Schema definition for notes
 * @author Chris
 */

var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  notebook: String,
  updated: { type: Date, default: Date.now() }
});

NoteSchema.statics.getNotes = function(skip, limit, callback) {
  var query = this.find({});
  if (skip !== null) {
    query = query.skip(skip);
  }
  if (limit > 0) {
    query = query.limit(limit);
  }
  query.exec(function(err, results) {
    callback(err, results);
  });
};

mongoose.model('Note', NoteSchema);
