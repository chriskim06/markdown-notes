/**
 * @fileoverview Create, get, and delete notes
 * @author Chris
 */

import { Note } from '../models/Note'
import { Router } from 'express'
const router = Router()

/**
 * GET all notes
 */
router.get('/', (req, res, next) => {
  Note.find({}).then((response) => {
    let data = []
    response.forEach((note) => {
      let condensed = note.content.substr(0, 100)
      if (condensed.length === 100) {
        condensed += '...'
      }
      data.push({
        id: note._id,
        title: note.title,
        content: condensed,
        notebook: note.notebook,
        updated: note.updated
      })
    })
    res.render('notes', {
      title: 'All Notes',
      notes: data,
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
    updated: Date.now()
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
    response.updated = Date.now()
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
