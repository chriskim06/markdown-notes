/**
 * @fileoverview Create a new note
 * @author Chris
 */

import { doNext } from '../util/helpers'
import { Router } from 'express'
import mongoose from 'mongoose'
const Note = mongoose.model('Note')
const router = Router()

/**
 * GET create page
 */
router.get('/add', (req, res, next) => {
  res.render('editor', {
    title: 'Add a new note!',
    action: '/notes/create'
  })
})

/**
 * GET edit page
 */
router.get('/update/:id', (req, res, next) => {
  let id = req.params.id
  Note.findOne({_id: id}, (err, data) => {
    doNext(err, res, next, data, (response, after, results) => {
      response.render('editor', {
        title: 'Update this note',
        action: '/notes/update/' + id,
        name: results.title,
        note: results.content
      })
    })
  })
})

module.exports = router
