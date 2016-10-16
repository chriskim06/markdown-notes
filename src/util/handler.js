/**
 * @fileoverview Functions to be used in callbacks
 * @author Chris
 */


/**
 * This is a commonly used callback handler that just passes the error
 * along if there is one and redirects to a page otherwise.
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
 */
export const sortNotes = (err, reply, notebook, callback) => {
  let notes = []
  if (reply) {
    for (let obj in reply) {
      if (reply.hasOwnProperty(obj)) {
        let note = JSON.parse(reply[obj])
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
          return a.edited < b.edited
        })
      }
    }
  }
  callback(err, notes, notebook)
}

export const sortNotesArray = (err, reply, notebook) => {
  let notes = []
  if (reply) {
    for (let obj in reply) {
      if (reply.hasOwnProperty(obj)) {
        let note = JSON.parse(reply[obj])
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
          return a.edited < b.edited
        })
      }
    }
  }
  return {
    notebook: notebook,
    notes: notes
  }
}
