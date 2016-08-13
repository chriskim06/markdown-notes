/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

var router = require('express').Router();
var Notebook = require('mongoose').model('Notebook');
var helpers = require('../util/helpers');

router.get('/', function(req, res, next) {
  getAllNotebooks(res, next);
});

router.post('/create', function(req, res, next) {
  var notebook = new Notebook({
    name: req.body.title,
    notes: []
  });
  notebook.persist(res, next, getAllNotebooks);
});

router.post('/edit', function(req, res, next) {
  Notebook.findOne({_id: req.body.notebookId}, function(err, data) {
    helpers.doNext(err, res, next, data, function(response, after, results) {
      results.name = req.body.title;
      results.persist(response, after, getAllNotebooks);
    });
  });
});

router.post('/delete', function(req, res, next) {
  Notebook.findOneAndRemove({_id: req.body.notebookId}, function(err, data) {
    helpers.doNext(err, res, next, data, getAllNotebooks);
  });
});

function getAllNotebooks(res, next) {
  Notebook.getNotebooks(0, 0, function(err, data) {
    helpers.doNext(err, res, next, data, function(response, after, results) {
      response.render('index', {notebookNames: results});
    });
  });
}

module.exports = router;
