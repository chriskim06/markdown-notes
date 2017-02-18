/**
 * @fileoverview Schema definition for notes
 * @author Chris
 */

import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  content: String,
  notebook: {type: mongoose.Schema.Types.ObjectId, ref: 'Notebook'},
  updated: {type: Date, default: Date.now()}
})

mongoose.model('Note', noteSchema)

export const Note = mongoose.model('Note')
