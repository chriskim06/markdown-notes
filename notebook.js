/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

var mongoose = require('mongoose');

var notebook = new mongoose.Schema({
  name: { type: String, unique: true },
  notes: [mongoose.Schema.Types.ObjectId]
});

mongoose.model('Notebooks', notebook);
