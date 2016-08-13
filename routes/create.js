/**
 * @fileoverview Create a new note
 * @author Chris
 */

var express = require('express');
var router = express.Router();

/* GET create page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Add a new note!' });
});

module.exports = router;
