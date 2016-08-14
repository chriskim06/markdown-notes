/**
 * @fileoverview Exporting route handlers and models at once
 * @author Chris
 */

import index from '../routes/index'
import notes from '../routes/notes'
import notebooks from '../routes/notebooks'
import editor from '../routes/editor'
import mongoose from 'mongoose'

export const Note = mongoose.model('Note')
export const Notebook = mongoose.model('Notebook')
export { index, notes, notebooks, editor }
