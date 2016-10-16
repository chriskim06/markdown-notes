/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { render, redirect } from '../util/handler'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getAll().then((response) => {
    render(null, res, next, 'index', {notebookNames: response})
  }, (error) => {
    next(error)
  })
})

/**
 * GET all notes for a notebook
 */
router.get('/notes/:id', (req, res, next) => {
  Notebook.getNotes(req.params.id).then((response) => {
    Note.getAll().then((notes) => {
      render(null, res, next, 'notes', {id: req.params.id, title: response.notebook, notes: response.notes, all: notes.all, button: true})
    }, (error) => {
      next(error)
    })
  }, (error) => {
    next(error)
  })
})

router.post('/notes/update', (req, res, next) => {
  Notebook.update(req.body.notebookId, null, req.body.notes, (err, data) => {
    if (err) {
      next(err)
    } else {
      Notebook.getNotes(req.body.notebookId).then((response) => {
        Note.getAll().then((notes) => {
          render(null, res, next, 'notes', {id: req.params.id, title: response.notebook, notes: response.notes, all: notes.all, button: true})
        }, (error) => {
          next(error)
        })
      }, (error) => {
        next(error)
      })
    }
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  let notebook = new Notebook(req.body.title, [])
  Notebook.persist(notebook).then((response) => {
    redirect(null, res, next, '/')
  }, (error) => {
    next(error)
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, null, (err, reply) => {
    redirect(err, res, next, '/')
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id).then((response) => {
    redirect(null, res, next, '/')
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
