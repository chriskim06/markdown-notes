/**
 * @fileoverview List/create notebooks
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebooks');

/* GET home page. */
router.get('/', function(req, res, next) {
  getNotebooks(res);
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
      getNotebooks(res);
    }
  });
});

function getNotebooks(res) {
  Notebook.find({}, function(err, data) {
    if (err) {
      res.redirect('/');
    } else {
      var notebooks = [];
      data.forEach(function(notebookInstance) {
        notebooks.push({
          id: notebookInstance._id,
          name: notebookInstance.name
        });
      });
      res.render('index', { notebookNames: notebooks });
    }
  });
}

module.exports = router;
