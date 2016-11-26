/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import { sortNotes, resolvePromise, cast, uuid } from '../util/helper'

const nb = 'notebooks'
const nb_set = 'notebook_id_set'

/**
 * Describes notebooks and contains methods for handling them.
 */
class Notebook {

  /**
   * Notebooks are simple. They only have a title and a list of
   * the notes that are a part of the notebook.
   *
   * @constructor
   * @param {string} name - The visible title of the notebook.
   */
  constructor(name) {
    this.id = uuid()
    this.name = name
    this.notes = '[]'
  }

  /**
   * This saves a notebook hash in redis.
   *
   * @returns {Promise}
   */
  persist() {
    return new Promise((resolve, reject) => {
      client.send_command('hmset', [`${nb}:${this.id}`, this], (err) => {
        if (!err) {
          client.send_command('sadd', [nb_set, this.id])
        }
        resolvePromise(err, this, resolve, reject)
      })
    })
  }

  /**
   * This adds a note ID to this notebook's array of notes.
   *
   * @param {string} note - The note to add.
   */
  addNote(note) {
    const parsed = JSON.parse(this.notes)
    if (!parsed.includes(note)) {
      parsed.push(note)
      this.notes = JSON.stringify(parsed)
      this.persist()
    }
  }

  /**
   * This removes a notebook hash from redis.
   *
   * @param {string} key - The ID of the notebook to be deleted.
   * @returns {Promise}
   */
  static remove(key) {
    return new Promise((resolve, reject) => {
      client.multi([
        ['del', `${nb}:${key}`],
        ['srem', nb_set, key]
      ]).exec((err, replies) => {
        resolvePromise(err, replies[0], resolve, reject)
      })
    })
  }

  /**
   * This saves new fields to an existing notebook. Only non null
   * and non empty values overwrite the previous ones.
   *
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
    }, (error) => {
      Promise.reject(error)
    })
  }

  /**
   * This gets a single notebook from redis.
   *
   * @param {string} key - The ID of the notebook.
   * @returns {Promise}
   */
  static get(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        resolve(null)
      } else {
        client.send_command('hgetall', [`${nb}:${key}`], (err, reply) => {
          resolvePromise(err, cast(reply, Notebook.prototype), resolve, reject)
        })
      }
    })
  }

  /**
   * This gets all of the notebooks from redis.
   *
   * @returns {Promise}
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      client.send_command('smembers', [nb_set], (err, reply) => {
        if (err) {
          reject(err)
        } else if (reply && reply.length) {
          let cmds = []
          reply.forEach((id) => {
            cmds.push(['hgetall', `${nb}:${id}`])
          })
          client.multi(cmds).exec((err, replies) => {
            let notebooks = []
            if (replies && replies.length) {
              replies.forEach((entry) => {
                notebooks.push(cast(entry, Notebook.prototype))
              })
              notebooks.sort((a, b) => a.name > b.name)
            }
            resolve(notebooks)
          })
        } else {
          resolve(null)
        }
      })
    })
  }

  /**
   * This resolves an array of all the notes that belong to this
   * notebook sorted by last modification date.
   *
   * @param {string} key - The notebook ID whose notes this method returns.
   * @param {string} sort - The property to sort the notes by.
   * @param {number} asc - Sorts ascending if this is a truthy value.
   * @returns {Promise}
   */
  static getNotes(key, sort, asc) {
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        if (response.notes && response.notes !== '[]') {
          const cmds = []
          const ids = JSON.parse(response.notes)
          ids.forEach((id) => {
            cmds.push(['hgetall', `notes:${id}`])
          })
          client.multi(cmds).exec((err, replies) => {
            const x = sortNotes(replies, sort, asc, response.name)
            resolve(x)
          })
        } else {
          resolve({
            notebook: response.name,
            notes: []
          })
        }
      }, (error) => {
        reject(error)
      })
    })
  }

  /**
   * This adds a note ID to this notebook's array of notes.
   *
   * @param {string} key - The ID of the notebook.
   * @param {string} note - The note to add.
   * @returns {Promise}
   */
  static addNote(key, note) {
    return Notebook.get(key).then((response) => {
      response.addNote(note)
    }, (error) => {
      Promise.reject(error)
    })
  }

}

export default Notebook
