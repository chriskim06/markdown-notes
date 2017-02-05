/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { sortNotes, stack } from '../util/helper'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getAll().then((response) => {
    res.render('notes', {
      id: '',
      title: 'All Notes',
      notes: sortNotes(response, 'edited', 0),
      all: [], button: false
    })
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * CREATE a new note
 */
router.post('/create', (req, res, next) => {
  const note = new Note(req.body.title, req.body.note)
  const p0 = note.persist()
  const p1 = Notebook.addNote(req.body.notebook, note.id)
  Promise.all([p0, p1]).then(() => {
    res.redirect('/notes')
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id/:notebook?', (req, res, next) => {
  Note.update(req.params.id, req.body.title, req.body.notebook, req.body.note).then(() => {
    const notebook = req.params.notebook
    const location = (notebook === 'undefined' || notebook === '') ? '/notes' : '/notebooks/notes/' + notebook
    res.redirect(location)
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.remove(req.params.id).then(() => {
    res.redirect('/notes')
  }).catch((error) => {
    next(stack(error))
  })
})

export default module.exports = router
