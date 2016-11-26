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
 * This is a common way to resolve a Promise. Its used in many of the
 * Note and Notebook methods.
 *
 * @param {object} error - The value to reject with.
 * @param {object} response - The value to resolve with.
 * @param {Function} resolve - The method for resolving the Promise.
 * @param {Function} reject - The method for rejecting the Promise.
 */
export const resolvePromise = (error, response, resolve, reject) => {
  if (error) {
    reject(error)
  } else {
    resolve(response)
  }
}

/**
 * This should be used when retrieving hashes from redis. The objects returned
 * from the database are missing some prototype methods so its necessary to
 * cast a new object with the desired prototype and then copy over the values.
 *
 * @param {Object} src - The object retrieved from redis.
 * @param {Object} prototype - The prototype of the object to use.
 * @returns {Object}
 */
export const cast = (src, prototype) => {
  const o = Object.create(prototype)
  return Object.assign(o, src)
}

/**
 * This executes the callback that it gets passed after building an array
 * of notes that will be used for rendering some react components. The
 * callback is passed an error object, the notes array, and the notebook id.
 *
 * @param {Array} reply - The array of notes to sort.
 * @param {string} prop - The property to sort the notes by.
 * @param {number} asc - Sorts ascending if this is a truthy value.
 * @returns {Array}
 */
export const sortNotes = (reply, prop, asc) => {
  const notes = []
  if (reply && reply.length) {
    reply.forEach((note) => {
      let time = new Date(parseInt(note.updated, 10))
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
    })
    notes.sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop]
      } else {
        return a[prop] < b[prop]
      }
    })
  }
  return notes
}
