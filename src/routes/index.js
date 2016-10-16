/**
 * @fileoverview List notebooks
 * @author Chris
 */

import Notebook from '../models/Notebook'
import { render } from '../util/handler'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks (currently the default page)
 */
router.get('/', (req, res, next) => {
  Notebook.getAll().then((response) => {
    render(null, res, next, 'index', {notebookNames: response})
  }, (error) => {
    next(error)
  })
})

export default module.exports = router
