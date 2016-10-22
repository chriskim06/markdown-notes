/**
 * @fileoverview Functions that are used in many places
 * @author Chris
 */

import shortId from 'shortid'

/**
 * Exports the generate method from shortId.
 */
export const uuid = shortId.generate

/**
 * This is a commonly used callback handler that just passes the error
 * along if there is one and redirects to a page otherwise.
 *
 * @param {Object} err - The error object being passed along.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} path - The URL to redirect to.
 */
export const redirect = (err, res, next, path) => {
  if (err) {
    next(err)
  } else {
    res.redirect(path)
  }
}

/**
 * This is a commonly used callback handler that just passes the error
 * along if there is one and renders a page otherwise.
 *
 * @param {Object} err - The error object being passed along.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} view - The view that will be rendered.
 * @param {Object} data - The data to pass to the view.
 */
export const render = (err, res, next, view, data) => {
  if (err) {
    next(err)
  } else {
    res.render(view, data)
  }
}

/**
 * This executes the callback that it gets passed after building an array
 * of notes that will be used for rendering some react components. The
 * callback is passed an error object, the notes array, and the notebook id.
 *
 * @param {Object} err - The error object being passed along.
 * @param {Array} reply - The array of notes to sort.
 * @param {string} prop - The property to sort the notes by.
 * @param {number} asc - Sorts ascending if this is a truthy value.
 * @param {?string} notebook - The notebook ID.
 */
export const sortNotes = (err, reply, prop, asc, notebook) => {
  let notes = []
  if (reply) {
    for (let obj in reply) {
      if (reply.hasOwnProperty(obj)) {
        let note = JSON.parse(reply[obj])
        if (note) {
          let time = new Date(note.updated)
          let condensed = note.content.substr(0, 100)
          if (condensed.length === 100) {
            condensed += '...'
          }
          notes.push({
            id: note.id,
            title: note.title,
            summary: condensed,
            content: note.content,
            edited: time.toLocaleString()
          })
          notes.sort((a, b) => {
            if (asc) {
              return b[prop].localeCompare(a[prop])
            } else {
              return a[prop].localeCompare(b[prop])
            }
          })
        }
      }
    }
  }
  return {
    notebook: notebook,
    notes: notes
  }
}
