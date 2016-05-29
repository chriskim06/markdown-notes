/**
 * @fileoverview Get all/delete notes
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = mongoose.model('Notes');

router.get('/', function(req, res, next) {
  Note.find({}, function(err, data) {
    if (err) {
      res.redirect('/');
    } else {
      var items = [];
      data.forEach(function(note) {
        var condensed = note.content.substr(0, 75);
        if (condensed.length === 75) {
          condensed += '...';
        }
        var time = new Date(note.updated);
        items.push({
          id: note._id,
          title: note.title,
          summary: condensed,
          content: note.content,
          edited: time.toLocaleString()
        });
      });
      items.reverse();

      res.render('notes', { notes: items });
    }
  });
});

router.post('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    Note.findOneAndRemove({ _id: id }, function(err, data) {
      res.redirect('/notes');
    });
  }
});

module.exports = router;
