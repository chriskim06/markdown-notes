/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');

router.get('/', function(req, res, next) {
  getAllNotebooks(res);
});

router.post('/create', function(req, res, next) {
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

router.post('/edit', function(req, res, next) {
  var query = { _id: req.body.notebookId };
  Notebook.findOne(query, function(err, data) {
    if (err) {
      return next(err);
    } else {
      data.name = req.body.title;
      data.save(function(err) {
        if (err) {
          return next(err);
        } else {
          getAllNotebooks(res);
        }
      });
    }
  });
});

router.post('/delete', function(req, res, next) {
  var query = { _id: req.body.notebookId };
  Notebook.findOneAndRemove(query, function(err, data) {
    if (err) {
      return next(err);
    } else {
      getAllNotebooks(res);
    }
  });
});

function getAllNotebooks(res) {
  Notebook.getNotebooks(0, 0, function(err, results) {
    if (err) {
      res.redirect('/');
    } else {
      res.render('index', { notebookNames: results });
    }
  });
}

module.exports = router;
