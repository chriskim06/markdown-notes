/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getAll().then((response) => {
    res.render('index', {notebookNames: response})
  }, (error) => {
    next(error)
  })
})

/**
 * GET all notes for a notebook
 */
router.get('/notes/:id', (req, res, next) => {
  const p0 = Notebook.getNotes(req.params.id, 'edited', 0)
  const p1 = Note.getAll('title', 1)
  Promise.all([p0, p1]).then((notes) => {
    res.render('notes', {id: req.params.id, title: notes[0].notebook, notes: notes[0].notes, all: notes[1], button: true})
  }).catch((error) => {
    next(error)
  })
})

/**
 * UPDATE the notes in a notebook
 */
router.post('/notes/update', (req, res, next) => {
  let notes = req.body.notes
  if (req.body.notes.constructor !== Array) {
    notes = [req.body.notes]
  }
  Notebook.update(req.body.notebookId, null, notes).then(() => {
    res.redirect(`/notebooks/notes/${req.body.notebookId}`)
  }, (error) => {
    next(error)
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  new Notebook(req.body.title).persist().then(() => {
    res.redirect('/')
  }, (error) => {
    next(error)
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, null).then(() => {
    res.redirect('/')
  }, (error) => {
    next(error)
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id).then(() => {
    res.redirect('/')
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
