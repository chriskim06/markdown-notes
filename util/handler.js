/**
 * @fileoverview Functions to be used in callbacks
 * @author Chris
 */

export const redirect = (err, res, next, path) => {
  if (err) {
    next(err)
  } else {
    res.redirect(path)
  }
}

export const render = (err, res, next, view, data) => {
  if (err) {
    next(err)
  } else {
    res.render(view, data)
  }
}

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
