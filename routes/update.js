/**
 * @fileoverview Update a note
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = mongoose.model('Notes');

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    Note.findById(id, function(err, data) {
      if (err) {
        res.redirect('/notes');
      } else {
        res.render('update', {
          uid: id,
          title: data.title,
          note: data.content
        });
      }
    });
  }
});

router.post('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    var updated = {
      title: req.body.title,
      content: req.body.note,
      updated: Date.now()
    };
    Note.findOneAndUpdate({ _id: id }, updated, function(err) {
      res.redirect('/notes');
    });
  }
});

module.exports = router;
