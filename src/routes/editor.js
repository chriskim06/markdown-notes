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
      notebooks: notebookOptions
    })
  }, (error) => {
    next(error)
  })
})

/**
 * GET edit page
 */
router.get('/update/:id/:notebook?', (req, res, next) => {
  Notebook.getAll().then((response) => {
    let notebookOptions = []
    for (let obj in response) {
      if (response.hasOwnProperty(obj)) {
        notebookOptions.push(response[obj])
      }
    }
    Note.get(req.params.id).then((data) => {
      let notebookOptions = []
      for (let obj in response) {
        if (response.hasOwnProperty(obj)) {
          notebookOptions.push(response[obj])
        }
      }
      res.render('editor', {
        title: 'Update this note',
        action: '/notes/update/' + req.params.id + '/' + req.params.notebook,
        name: data.title,
        note: data.content,
        notebooks: notebookOptions,
        selection: data.notebook
      })
    }, (error) => {
      next(error)
    })
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
