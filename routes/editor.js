/**
 * @fileoverview Create a new note
 * @author Chris
 */

import { Note } from '../util/loader'
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
  Note.findOne({_id: id}, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.render('editor', {
        title: 'Update this note',
        action: '/notes/update/' + id,
        name: data.title,
        note: data.content
      })
    }
  })
})

export default module.exports = router
