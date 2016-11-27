/**
 * @fileoverview Create a new note
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { stack } from '../util/helper'
import { Router } from 'express'
const router = Router()

/**
 * GET create page
 */
router.get('/add', (req, res, next) => {
  Notebook.getAll().then((response) => {
    res.render('editor', {
      title: 'Add a new note!',
      action: '/notes/create',
      notebooks: response,
      showNotebooks: true
    })
  }).catch((error) => {
    next(stack(error))
  })
})

/**
 * GET edit page
 */
router.get('/update/:id/:notebook?', (req, res, next) => {
  Note.get(req.params.id).then((response) => {
    res.render('editor', {
      title: 'Update this note',
      action: `/notes/update/${req.params.id}/${req.params.notebook}`,
      name: response.title,
      note: response.content,
      showNotebooks: false
    })
  }).catch((error) => {
    next(stack(error))
  })
})

export default module.exports = router
