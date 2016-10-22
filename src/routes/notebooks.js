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
  const p1 = Notebook.getNotes(req.params.id, 'edited')
  const p2 = Note.getAll('title', 0)
  Promise.all([p1, p2]).then((notes) => {
    render(null, res, next, 'notes', {id: req.params.id, title: notes[0].notebook, notes: notes[0].notes, all: notes[1], button: true})
  }, (error) => {
    next(error)
  })
})

router.post('/notes/update', (req, res, next) => {
  Notebook.update(req.body.notebookId, null, req.body.notes, (err, data) => {
    if (err) {
      next(err)
    } else {
      Notebook.getNotes(req.body.notebookId, 'edited').then((response) => {
        Note.getAll('title', 1).then((notes) => {
          redirect(err, res, next, `/notebooks/notes/${req.body.notebookId}`)
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
  Notebook.persist(notebook).then(() => {
    redirect(null, res, next, '/')
  }, (error) => {
    next(error)
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, null, (err) => {
    redirect(err, res, next, '/')
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id).then(() => {
    redirect(null, res, next, '/')
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
