/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import Notebook from '../models/Notebook'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getAll((err, data) => {
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
  let notebook = new Notebook(req.body.title, [])
  Notebook.persist(notebook, (err, reply) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, (err, reply) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})

export default module.exports = router
