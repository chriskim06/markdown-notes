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
  Notebook.getAll().then((response) => {
    res.render('index', {notebookNames: response})
  }).catch((error) => {
    next(error)
  })
})

export default module.exports = router
