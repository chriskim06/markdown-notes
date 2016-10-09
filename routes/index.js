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
  Notebook.getAll((err, data) => {
    render(err, res, next, 'index', {notebookNames: data})
  })
})

export default module.exports = router
