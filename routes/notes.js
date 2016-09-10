/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import { Note } from '../util/loader'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getAllNotes(0, 0, (err, data) => {
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
  let note = new Note({
    title: req.body.title,
    content: req.body.note,
    updated: Date.now()
  })
  note.persist(res, '/notes', next)
})

/**
 * UPDATE a note
 */
router.post('/update/:id', (req, res, next) => {
  Note.findOne({_id: req.params.id}, (err, data) => {
    if (err) {
      next(err)
    } else {
      data.title = req.body.title
      data.content = req.body.note
      data.updated = Date.now()
      data.persist(res, '/notes', next)
    }
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.findOneAndRemove({_id: req.params.id}, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/notes')
    }
  })
})

export default module.exports = router
