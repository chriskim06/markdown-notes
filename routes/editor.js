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
  Notebook.getAll((err, data) => {
    if (err) {
      next(err)
    } else {
      let notebookOptions = []
      for (let obj in data) {
        if (data.hasOwnProperty(obj)) {
          notebookOptions.push(data[obj])
        }
      }
      res.render('editor', {
        title: 'Add a new note!',
        action: '/notes/create',
        notebooks: notebookOptions
      })
    }
  })
})

/**
 * GET edit page
 */
router.get('/update/:id', (req, res, next) => {
  Notebook.getAll((err, data) => {
    if (err) {
      next(err)
    } else {
      let notebookOptions = []
      for (let obj in data) {
        if (data.hasOwnProperty(obj)) {
          notebookOptions.push(data[obj])
        }
      }
      Note.get(req.params.id, (err, data) => {
        if (err) {
          next(err)
        } else {
          res.render('editor', {
            title: 'Update this note',
            action: '/notes/update/' + req.params.id,
            name: data.title,
            note: data.content,
            notebooks: notebookOptions,
            selection: data.notebook
          })
        }
      })
    }
  })
})

export default module.exports = router
