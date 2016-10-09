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
  Note.getAll((err, data) => {
    if (err) {
      next(err)
    } else {
      res.render('notes', {notes: data})
    }
  })
})

/**
 * CREATE a new note
 */
router.post('/create', (req, res, next) => {
  let note = new Note(req.body.title, req.body.note, req.body.notebook)
  Note.persist(note, (err, reply) => {
    if (err) {
      next(err)
    } else {
      Notebook.addNote(req.body.notebook, note.id)
      res.redirect('/notes')
    }
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id', (req, res, next) => {
  Note.update(req.params.id, req.body.title, req.body.notebook, req.body.note, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/notes')
    }
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.remove(req.params.id, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/notes')
    }
  })
})

export default module.exports = router
