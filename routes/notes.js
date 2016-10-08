/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import Note from '../models/Note'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getAllNotes((err, data) => {
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
  let note = new Note(req.body.title, req.body.note, null)
  Note.persist(note, (err, reply) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/notes')
    }
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id', (req, res, next) => {
  Note.getNote(req.params.id, (err, data) => {
    if (err) {
      next(err)
    } else {
      data.title = req.body.title
      data.content = req.body.note
      data.updated = Date.now()
      Note.persist(data, (err, reply) => {
        if (err) {
          next(err)
        } else {
          res.redirect('/notes')
        }
      })
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
