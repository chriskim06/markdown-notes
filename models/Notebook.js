/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

import mongoose from 'mongoose'
import { doNext } from '../util/helpers'

const notebookSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  notes: [mongoose.Schema.Types.ObjectId]
})

/**
 * Common method for all Notebook instances
 * @param res
 * @param next
 * @param callback
 */
notebookSchema.methods.persist = function(res, next, callback) {
  this.save((err) => {
    doNext(err, res, next, null, callback)
  })
}

/**
 * Static method for getting an array of notes
 * @param skip
 * @param limit
 * @param callback
 */
notebookSchema.statics.getNotebooks = function(skip, limit, callback) {
  let query = this.find({})
  if (skip !== null) {
    query = query.skip(skip)
  }
  if (limit > 0) {
    query = query.limit(limit)
  }
  query.exec((err, results) => {
    let notebooks = []
    results.forEach((notebook) => {
      notebooks.push({
        id: notebook._id,
        name: notebook.name
      })
    })
    callback(err, notebooks)
  })
}

mongoose.model('Notebook', notebookSchema)
