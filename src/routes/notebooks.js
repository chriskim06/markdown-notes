/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { sortNotes, stack } from '../util/helper'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.getAll().then((response) => {
    res.render('index', {notebookNames: response})
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * GET all notes for a notebook
 */
router.get('/notes/:id', (req, res, next) => {
  const p0 = Notebook.getNotes(req.params.id)
  const p1 = Note.getAll('title', 1)
  Promise.all([p0, p1]).then((notes) => {
    res.render('notes', {
      id: req.params.id,
      title: notes[0].notebook,
      notes: sortNotes(notes[0].notes, 'edited', 0),
      all: notes[1],
      button: true,
      selected: notes[0].notes.map((note) => {
        return note.id
      })
    })
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * UPDATE the notes in a notebook
 */
router.post('/notes/update', (req, res, next) => {
  let notes = req.body.notes
  if (notes == null) {
    notes = []
  } else if (notes.constructor !== Array) {
    notes = [req.body.notes]
  }
  Notebook.update(req.body.notebookId, null, notes).then(() => {
    res.redirect(`/notebooks/notes/${req.body.notebookId}`)
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  new Notebook(req.body.title).persist().then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.update(req.body.notebookId, req.body.title, null).then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.remove(req.params.id).then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(stack(error))
  })
})

export default module.exports = router
