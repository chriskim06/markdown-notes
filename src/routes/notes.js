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
  Note.getAll('edited', 0).then((response) => {
    res.render('notes', {id: '', title: 'All Notes', notes: response, all: [], button: false})
  }, (error) => {
    next(error)
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
    next(error)
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id/:notebook?', (req, res, next) => {
  const params = req.params
  const body = req.body
  Note.update(params.id, body.title, body.notebook, body.note).then(() => {
    const location = (params.notebook === 'undefined' || params.notebook === '') ? '/notes' : '/notebooks/notes/' + params.notebook
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
