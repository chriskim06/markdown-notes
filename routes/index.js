/**
 * @fileoverview List notebooks
 * @author Chris
 */

import { Notebook } from '../util/loader'
import { Router } from 'express'
const router = Router()

/**
 * GET all notebooks (currently the default page)
 */
router.get('/', (req, res, next) => {
  Notebook.getNotebooks(0, 0, (err, data) => {
    if (err) {
      next(err)
    } else {
      res.render('index', {notebookNames: data})
    }
  })
})

export default module.exports = router
