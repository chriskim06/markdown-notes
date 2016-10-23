/**
 * @fileoverview Create a new note
 * @author Chris
 */

import Note from '../models/Note'
import Notebook from '../models/Notebook'
import { Router } from 'express'
const router = Router()

/**
 * GET create page
 */
router.get('/add', (req, res, next) => {
  Notebook.getAll().then((response) => {
    let notebookOptions = []
    for (let obj in response) {
      if (response.hasOwnProperty(obj)) {
        notebookOptions.push(response[obj])
      }
    }
    res.render('editor', {
      title: 'Add a new note!',
      action: '/notes/create',
      notebooks: notebookOptions,
      showNotebooks: true
    })
  }, (error) => {
    next(error)
  })
})

/**
 * GET edit page
 */
router.get('/update/:id/:notebook?', (req, res, next) => {
  let params = req.params
  Note.get(params.id).then((response) => {
    res.render('editor', {
      title: 'Update this note',
      action: `/notes/update/${params.id}/${params.notebook}`,
      name: response.title,
      note: response.content,
      showNotebooks: false
    })
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
