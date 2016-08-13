/**
 * @fileoverview Create a new note
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = mongoose.model('Note');

/* GET create page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Add a new note!' });
});

router.post('/', function(req, res, next) {
  var note = new Note({
    title: req.body.title,
    content: req.body.note,
    updated: Date.now()
  });
  note.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
