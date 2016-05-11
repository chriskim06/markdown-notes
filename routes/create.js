/**
 * @fileoverview
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = mongoose.model('Notes');

/* GET create page. */
router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/', function(req, res, next) {
  var content = req.body;
  var note = new Note({
    title: content.title,
    content: content.note,
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
