/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getAll('edited', 1).then((notes) => {
    res.render('notes', {id: '', title: 'All Notes', notes: notes, all: [], button: false})
  }, (error) => {
    next(error)
  })
})

/**
 * CREATE a new note
 */
router.post('/create', (req, res, next) => {
  let note = new Note(req.body.title, req.body.note)
  const p1 = Note.persist(note)
  const p2 = Notebook.addNote(req.body.notebook, note.id)
  Promise.all([p1, p2]).then(() => {
    res.redirect('/notes')
  }, (error) => {
    next(error)
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id/:notebook?', (req, res, next) => {
  Note.update(req.params.id, req.body.title, req.body.notebook, req.body.note).then(() => {
    let location = (req.params.notebook === 'undefined' || req.params.notebook === '') ? '/notes' : '/notebooks/notes/' + req.params.notebook
    res.redirect(location)
  }, (error) => {
    next(error)
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.remove(req.params.id).then(() => {
    res.redirect('/notes')
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
