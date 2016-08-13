/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

var router = require('express').Router();
var Note = require('mongoose').model('Note');
var helpers = require('../util/helpers');

router.get('/', function(req, res, next) {
  Note.getNotes(0, 0, function(err, data) {
    helpers.doNext(err, res, next, data, function(response, after, results) {
      response.render('notes', {notes: results});
    });
  });
});

router.post('/create', function(req, res, next) {
  var note = new Note({
    title: req.body.title,
    content: req.body.note,
    updated: Date.now()
  });
  note.persist(res, next, function(response, after, results) {
    response.redirect('/');
  });
});

router.post('/delete/:id', function(req, res, next) {
  Note.findOneAndRemove({_id: req.params.id}, function(err, data) {
    helpers.doNext(err, res, next, data, function(response, after, results) {
      response.redirect('/notes');
    });
  });
});

module.exports = router;
