/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import R from 'ramda'
import client from './db'
import Model from './Model'
import { stack } from '../util/helper'

const nb = 'notebooks'
const nb_set = 'notebook_id_set'

/**
 * Describes notebooks and contains methods for handling them.
 */
class Notebook extends Model {

  /**
   * Notebooks are simple. They only have a title and a list of
   * the notes that are a part of the notebook.
   * @constructor
   * @param {string} name - The visible title of the notebook.
   */
  constructor(name) {
    super(nb, nb_set)
    this.name = name
    this.notes = '[]'
  }

  /**
   * This saves a notebook hash in redis.
   * @returns {Promise}
   * @see Model#persist
   */
  persist() {
    return super.persist()
  }

  /**
   * This adds a note ID to this notebook's array of notes.
   * @param {string} note - The note to add.
   */
  addNote(note) {
    const parsed = JSON.parse(this.notes)
    if (!parsed.includes(note)) {
      parsed.push(note)
      this.notes = JSON.stringify(parsed)
      super.persist()
    }
  }

  /**
   * This removes a notebook hash from redis.
   * @param {string} key - The ID of the notebook to be deleted.
   * @returns {Promise}
   * @see Model#remove
   */
  static remove(key) {
    return super.remove(key, nb, nb_set)
  }

  /**
   * This saves new fields to an existing notebook. Only non null
   * and non empty values overwrite the previous ones.
   * @param {string} key - The ID of the notebook to update.
   * @param {?string} name - The new title to set.
   * @param {?Array} notes - The new note IDs to set.
   * @returns {Promise}
   */
  static update(key, name, notes) {
    return Notebook.get(key).then((response) => {
      if (name) {
        response.name = name
      }
      if (notes && notes.constructor === Array) {
        response.notes = JSON.stringify(notes)
      }
      response.persist()
    }).catch((error) => {
      Promise.reject(stack(error))
    })
  }

  /**
   * This gets a single notebook from redis.
   * @param {string} key - The ID of the notebook.
   * @returns {Promise}
   * @see Model#get
   */
  static get(key) {
    return super.get(key, nb, Notebook.prototype)
  }

  /**
   * This gets all of the notebooks from redis.
   * @returns {Promise}
   * @see Model#getAll
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      super.getAll(nb, nb_set, (err, replies) => {
        if (err) {
          reject(stack(err))
        } else {
          if (replies && replies.length) {
            replies.sort((a, b) => a.name > b.name)
          }
          resolve(replies)
        }
      })
    })
  }

  /**
   * This resolves an array of all the notes that belong to this notebook.
   * This should be used when you only have the notebook id.
   * @param {string} key - The notebook ID whose notes this method returns.
   * @returns {Promise}
   */
  static getNotes(key) {
    let comp = R.composeP(Notebook.getAllNotes, Notebook.get)
    return comp(key)
  }

  /**
   * This gets the notes in a notebook. This should be used if you already
   * have the notebook object.
   * @param notebook
   * @returns {Promise}
   */
  static getAllNotes(notebook) {
    return new Promise((resolve, reject) => {
      if (!notebook.notes || notebook.notes === '[]') {
        resolve({notebook: notebook.name, notes: []})
      } else {
        const cmds = []
        JSON.parse(notebook.notes).forEach((id) => {
          cmds.push(['hgetall', `notes:${id}`])
        })
        client.multi(cmds).exec((err, replies) => {
          if (err) {
            reject(stack(err))
          } else {
            resolve({notebook: notebook.name, notes: replies})
          }
        })
      }
    })
  }

  /**
   * This adds a note ID to this notebook's array of notes.
   * @param {string} key - The ID of the notebook.
   * @param {string} note - The note to add.
   * @returns {Promise}
   */
  static addNote(key, note) {
    return Notebook.get(key).then((response) => {
      response.addNote(note)
    }).catch((error) => {
      Promise.reject(stack(error))
    })
  }

}

export default Notebook
