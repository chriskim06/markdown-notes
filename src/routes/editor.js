/**
 * @fileoverview Create a new note
 * @author Chris
 */

import { Note } from '../models/Note'
import { Router } from 'express'
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
  Note.findOne({_id: id}).then((response) => {
    res.render('editor', {
      title: 'Update this note',
      action: '/notes/update/' + id,
      name: response.title,
      note: response.content
    })
  }).catch((error) => {
    next(error)
  })
})

export default module.exports = router
