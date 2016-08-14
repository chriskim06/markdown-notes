/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import { Notebook } from '../util/loader'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getNotebooks(0, 0, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.render('index', {notebookNames: data})
    }
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  let notebook = new Notebook({
    name: req.body.title,
    notes: []
  })
  notebook.persist(res, '/', next)
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.findOne({_id: req.body.notebookId}, (err, data) => {
    if (err) {
      next(err)
    } else {
      data.name = req.body.title
      data.persist(res, '/', next)
    }
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.findOneAndRemove({_id: req.params.id}, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})

export default module.exports = router
