/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

var mongoose = require('mongoose');

var NotebookSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  notes: [mongoose.Schema.Types.ObjectId]
});

NotebookSchema.statics.getNotebooks = function(skip, limit, callback) {
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

mongoose.model('Notebook', NotebookSchema);
