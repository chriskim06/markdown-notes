/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

import mongoose from 'mongoose'

/**
 *
 */
const notebookSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
})

notebookSchema.path('title').required(true, 'Notebook title cannot be blank')


const Notebook = mongoose.model('Notebook', notebookSchema)

export default Notebook
