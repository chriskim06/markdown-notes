/**
 * @fileoverview Helper methods
 * @author Chris
 */

/**
 * This returns a notes array in ascending/descending order based on the
 * supplied property to sort by. An empty array is returned if there is
 * nothing to sort.
 * @param {Array} reply - The array of notes to sort.
 * @param {string} prop - The property to sort the notes by.
 * @param {number} asc - Sorts ascending if this is a truthy value.
 * @returns {Array}
 */
export const sortNotes = (reply, prop, asc) => {
  if (reply && reply.length) {
    let data = []
    reply.forEach((note) => {
      let condensed = note.content.substr(0, 100)
      if (condensed.length === 100) {
        condensed += '...'
      }
      data.push({
        id: note._id,
        title: note.title,
        content: condensed,
        notebook: note.notebook,
        updated: note.updated
      })
    })
    return data.sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop]
      } else {
        return a[prop] < b[prop]
      }
    })
  }
  return []
}
