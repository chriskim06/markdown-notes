/**
 * @fileoverview Schema definition for notes
 * @author Chris
 */

import mongoose from 'mongoose'
import { doNext } from '../util/helpers'

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  notebook: String,
  updated: {type: Date, default: Date.now()}
})

/**
 * Common method for all Note instances
 * @param res
 * @param next
 * @param callback
 */
noteSchema.methods.persist = function(res, next, callback) {
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
noteSchema.statics.getNotes = function(skip, limit, callback) {
  let query = this.find({})
  if (skip !== null) {
    query = query.skip(skip)
  }
  if (limit > 0) {
    query = query.limit(limit)
  }
  query.exec((err, results) => {
    let items = []
    results.forEach((note) => {
      let condensed = note.content.substr(0, 75)
      if (condensed.length === 75) {
        condensed += '...'
      }
      let time = new Date(note.updated)
      items.push({
        id: note._id,
        title: note.title,
        summary: condensed,
        content: note.content,
        edited: time.toLocaleString()
      })
    })
    items.reverse()
    callback(err, items)
  })
}

mongoose.model('Note', noteSchema)