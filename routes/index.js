/**
 * @fileoverview List notebooks
 * @author Chris
 */

var router = require('express').Router();
var Notebook = require('mongoose').model('Notebook');
var helpers = require('../util/helpers');

router.get('/', function(req, res, next) {
  Notebook.getNotebooks(0, 0, function(err, data) {
    helpers.doNext(err, res, next, data, function(response, after, results) {
      response.render('index', {notebookNames: results});
    });
  });
});

module.exports = router;
