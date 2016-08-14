/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import { doNext } from '../util/helpers'
import { Router } from 'express'
import mongoose from 'mongoose'
const Notebook = mongoose.model('Notebook')
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  getAllNotebooks(res, next)
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  let notebook = new Notebook({
    name: req.body.title,
    notes: []
  })
  notebook.persist(res, next, getAllNotebooks)
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.findOne({_id: req.body.notebookId}, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      results.name = req.body.title
      results.persist(response, after, getAllNotebooks)
    })
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete', (req, res, next) => {
  Notebook.findOneAndRemove({_id: req.body.notebookId}, (err, data) => {
    doNext(err, res, next, data, getAllNotebooks)
  })
})

/**
 * Private function for returning the list of notebooks
 * @param res
 * @param next
 */
const getAllNotebooks = (res, next) => {
  Notebook.getNotebooks(0, 0, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      response.render('index', {notebookNames: results})
    })
  })
}

module.exports = router
