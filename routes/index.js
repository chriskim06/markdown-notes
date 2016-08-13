/**
 * @fileoverview List notebooks
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');

/* GET home page. */
router.get('/', function(req, res, next) {
  Notebook.getNotebooks(0, 0, function(err, results) {
    if (err) {
      res.redirect('/');
    } else {
      res.render('index', { notebookNames: results });
    }
  });
});

module.exports = router;
