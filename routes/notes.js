/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import { doNext } from '../util/helpers'
import { Router } from 'express'
import mongoose from 'mongoose'
const Note = mongoose.model('Note')
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.getNotes(0, 0, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      response.render('notes', {notes: results})
    })
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
  note.persist(res, next, (response, after, results) => {
    response.redirect('/notes')
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id', (req, res, next) => {
  Note.findOne({_id: req.params.id}, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      results.title = req.body.title
      results.content = req.body.note
      results.updated = Date.now()
      results.persist(response, after, () => {
        response.redirect('/notes')
      })
    })
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.findOneAndRemove({_id: req.params.id}, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      response.redirect('/notes')
    })
  })
})

module.exports = router
