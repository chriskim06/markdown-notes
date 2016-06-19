/**
 * @fileoverview List/create notebooks
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');

/* GET home page. */
router.get('/', function(req, res, next) {
  getAllNotebooks(res);
});

router.post('/notebooks/create', function(req, res, next) {
  var notebook = new Notebook({
    name: req.body.title,
    notes: []
  });
  notebook.save(function(err) {
    if (err) {
      return next(err);
    } else {
      getAllNotebooks(res);
    }
  });
});

function getAllNotebooks(res) {
  Notebook.getNotebooks(0, 0, function (err, results) {
    if (err) {
      res.redirect('/');
    } else {
      res.render('index', { notebookNames: results });
    }
  });
}

module.exports = router;
