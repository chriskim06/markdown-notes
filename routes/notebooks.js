/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import Notebook from '../models/Notebook'
import { render, redirect } from '../util/handler'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getAll((err, data) => {
    render(err, res, next, 'index', {notebookNames: data})
  })
})

/**
 * GET all notes for a notebook
 */
router.get('/notes/:id', (req, res, next) => {
  Notebook.getAllNotes(req.params.id, (err, data, notebook) => {
    if (err) {
      next(err)
    } else {
      render(err, res, next, 'notes', {id: req.params.id, title: notebook, notes: data, button: true})
    }
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  let notebook = new Notebook(req.body.title, [])
  Notebook.persist(notebook, (err, reply) => {
    redirect(err, res, next, '/')
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, (err, reply) => {
    redirect(err, res, next, '/')
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id, (err, data) => {
    redirect(err, res, next, '/')
  })
})

export default module.exports = router
