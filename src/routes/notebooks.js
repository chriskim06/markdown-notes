/**
 * @fileoverview Create, edit, and delete notebooks
 * @author Chris
 */

import { Notebook } from '../models/Notebook'
import { Note } from '../models/Note'
import { sortNotes } from '../util/helper'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks
 */
router.get('/', (req, res, next) => {
  Notebook.find({}).then((response) => {
    res.render('index', {notebooks: response})
  }).catch((error) => {
    next(error)
  })
})

/**
 * GET all notes for a notebook
 */
router.get('/notes/:id', (req, res, next) => {
  const p0 = Notebook.findOne({_id: req.params.id}).populate('notes').exec()
  const p1 = Note.find({})
  Promise.all([p0, p1]).then((response) => {
    res.render('notes', {
      id: response[0]._id,
      title: response[0].title,
      notes: sortNotes(response[0].notes, 'updated', 0),
      all: sortNotes(response[1], 'title', 1),
      selected: response[0].notes.map((note) => {
        return note.id
      }),
      button: true
    })
  }).catch((error) => {
    next(error)
  })
})

/**
 * UPDATE the notes in a notebook
 */
router.post('/notes/update/:id', (req, res, next) => {
  let notes = req.body.notes
  if (notes == null) {
    notes = []
  } else if (notes.constructor !== Array) {
    notes = [req.body.notes]
  }
  Notebook.findOneAndUpdate({_id: req.params.id}, {notes: notes}).then(() => {
    res.redirect(`/notebooks/notes/${req.params.id}`)
  }).catch((error) => {
    next(error)
  })
})

/**
 * CREATE a new notebook
 */
router.post('/create', (req, res, next) => {
  let notebook = new Notebook({
    title: req.body.title,
    notes: []
  })
  notebook.save().then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(error)
  })
})

/**
 * UPDATE an existing notebook
 */
router.post('/edit', (req, res, next) => {
  Notebook.findOne({_id: req.body.notebookId}).then((response) => {
    response.title = req.body.title
    response.save()
  }).then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(error)
  })
})

/**
 * DELETE a notebook
 */
router.post('/delete/:id', (req, res, next) => {
  Notebook.findOneAndRemove({_id: req.params.id}).then(() => {
    res.redirect('/')
  }).catch((error) => {
    next(error)
  })
})

export default module.exports = router
