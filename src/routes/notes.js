/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { render, redirect } from '../util/handler'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getAll((err, data) => {
    render(err, res, next, 'notes', {id: '', title: 'All Notes', notes: data, all: [], button: false})
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
router.post('/update/:id/:notebook?', (req, res, next) => {
  Note.update(req.params.id, req.body.title, req.body.notebook, req.body.note, (err, data) => {
    let location = (!req.params.notebook) ? '/notes' : '/notebooks/notes/' + req.params.notebook
    redirect(err, res, next, location)
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.remove(req.params.id, (err, data) => {
    redirect(err, res, next, '/notes')
  })
})

export default module.exports = router
