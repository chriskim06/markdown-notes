/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

var mongoose = require('mongoose');
var helpers = require('../util/helpers');

var notebookSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  notes: [mongoose.Schema.Types.ObjectId]
});

notebookSchema.methods.persist = function(res, next, callback) {
  this.save(function(err) {
    helpers.doNext(err, res, next, null, callback);
  });
};

notebookSchema.statics.getNotebooks = function(skip, limit, callback) {
  var query = this.find({});
  if (skip !== null) {
    query = query.skip(skip);
  }
  if (limit > 0) {
    query = query.limit(limit);
  }
  query.exec(function(err, results) {
    var notebooks = [];
    results.forEach(function(notebook) {
      notebooks.push({
        id: notebook._id,
        name: notebook.name
      });
    });
    callback(err, notebooks);
  });
};

mongoose.model('Notebook', notebookSchema);
