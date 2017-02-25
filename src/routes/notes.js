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
  Note.find({}).sort({updated: 'desc'}).then((response) => {
    res.render('notes', {
      title: 'All Notes',
      notes: response,
      all: [],
      button: false
    })
  }).catch((error) => {
    next(error)
  })
})

/**
 * CREATE a new note
 */
router.post('/create', (req, res, next) => {
  let note = new Note({
    title: req.body.title,
    content: req.body.note,
    updated: new Date()
  })
  note.save().then(() => {
    res.redirect('/notes')
  }).catch((error) => {
    next(error)
  })
})

/**
 * UPDATE a note
 */
router.post('/update/:id', (req, res, next) => {
  Note.findOne({_id: req.params.id}).then((response) => {
    response.title = req.body.title
    response.content = req.body.note
    response.updated = new Date()
    response.save()
  }).then(() => {
    res.redirect('/notes')
  }).catch((error) => {
    next(error)
  })
})

/**
 * DELETE a note
 */
router.post('/delete/:id', (req, res, next) => {
  Note.findOneAndRemove({_id: req.params.id}).then(() => {
    res.redirect('/notes')
  }).catch((error) => {
    next(error)
  })
})

export default module.exports = router
