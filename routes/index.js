/**
 * @fileoverview List notebooks
 * @author Chris
 */

import Notebook from '../models/Notebook'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks (currently the default page)
 */
router.get('/', (req, res, next) => {
  Notebook.getAllNotebooks((err, data) => {
    if (err) {
      next(err)
    } else {
      res.render('index', {notebookNames: data})
    }
  })
})

export default module.exports = router
