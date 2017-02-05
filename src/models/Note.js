/**
 * @fileoverview Note definition and methods
 * @author Chris
 */

import Model from './Model'
import Notebook from './Notebook'
import { sortNotes, stack } from '../util/helper'

const n = 'notes'
const n_set = 'notes_id_set'

/**
 * Describes notes and contains methods for handling them.
 */
class Note extends Model {

  /**
   * This instantiates a single note which can later be saved in redis.
   * There are two fields that are not set in the constructor: a unique
   * id and the time this note was last modified.
   * @constructor
   * @param {string} title - The title of the note.
   * @param {string} content - The markdown contents of the note.
   */
  constructor(title, content) {
    super(n, n_set)
    this.title = title
    this.content = content
    this.updated = Date.now()
  }

  /**
   * This saves a note to the notes hash in redis.
   * @returns {Promise}
   * @see Model#persist
   */
  persist() {
    return super.persist()
  }

  /**
   * This removes a note from the redis hash.
   * @param {string} key - The ID of the note to be deleted.
   * @returns {Promise}
   * @see Model#remove
   */
  static remove(key) {
    return super.remove(key, n, n_set)
  }

  /**
   * This saves new fields to an existing note object. Only non null
   * and non empty values overwrite the previous ones.
   * @param {string} key - The ID of the note to update.
   * @param {string} title - The new title to set.
   * @param {string} notebook - The new notebook ID to set.
   * @param {string} content - The content to set.
   */
  static update(key, title, notebook, content) {
    const p0 = Notebook.get(notebook)
    const p1 = Note.get(key)
    return Promise.all([p0, p1]).then((response) => {
      if (response[0] != null) {
        response[0].addNote(key)
      }
      response[1].title = title
      response[1].content = content
      response[1].updated = Date.now()
      response[1].persist()
    }).catch((error) => {
      Promise.reject(stack(error))
    })
  }

  /**
   * This gets a single note object from the notes hash.
   * @param key - The ID of the note.
   * @returns {Promise}
   * @see Model#get
   */
  static get(key) {
    return super.get(key, n, Note.prototype)
  }

  /**
   * This gets all of the notes from redis.
   * @param {string} sort - The property to sort the notes by.
   * @param {number} asc - Sorts ascending if this is a truthy value.
   * @returns {Promise}
   * @see Model#getAll
   */
  static getAll(sort, asc) {
    return new Promise((resolve, reject) => {
      super.getAll(n, n_set, (err, replies) => {
        if (err) {
          reject(stack(err))
        } else {
          resolve(sortNotes(replies, sort, asc))
        }
      })
    })
  }

}

export default Note
