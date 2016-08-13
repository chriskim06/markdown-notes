/**
 * @fileoverview List notebooks
 * @author Chris
 */

// var router = require('express').Router();
// var Notebook = require('mongoose').model('Notebook');
// var helpers = require('../util/helpers');
import { doNext } from '../util/helpers'
import { Router } from 'express'
import mongoose from 'mongoose'
let Notebook = mongoose.model('Notebook')
let router = Router()

/**
 * GET all notebooks (currently the default page)
 */
router.get('/', (req, res, next) => {
  Notebook.getNotebooks(0, 0, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      response.render('index', {notebookNames: results})
    })
  })
})

module.exports = router
