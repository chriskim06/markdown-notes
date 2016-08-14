/**
 * @fileoverview Preview a markdown file
 * @author Chris
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = mongoose.model('Note');

/* GET a single note. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    Note.findById(id, function(err, data) {
      if (err) {
        res.redirect('/notes');
      } else {
        res.render('preview', {
          uid: id,
          title: data.title,
          note: data.content
        });
      }
    });
  }
});

module.exports = router;
