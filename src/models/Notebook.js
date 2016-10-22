/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import { sortNotes, uuid } from '../util/handler'

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
   * @param {Array} notes - An array of note IDs associated with the notebook.
   */
  constructor(name, notes = []) {
    this.id = uuid()
    this.name = name
    this.notes = notes
  }

  /**
   * This saves a note to the notes hash in redis.
   *
   * @param {Object} notebook - The notebook object to be saved.
   * @returns {Promise}
   */
  static persist(notebook) {
    return new Promise((resolve, reject) => {
      client.send_command('hset', ['notebooks', [`${notebook.id}`, JSON.stringify(notebook)]], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(notebook)
        }
      })
    })
  }

  /**
   * This removes a note from the redis hash.
   *
   * @param {string} key - The ID of the notebook to be deleted.
   * @returns {Promise}
   */
  static remove(key) {
    return new Promise((resolve, reject) => {
      client.send_command('hdel', ['notebooks', key], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  /**
   * This saves new fields to an existing note object. Only non null
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
      if (notes && notes.length) {
        response.notes = notes
      }
      return Notebook.persist(response)
    }, (error) => {
      return Promise.reject(error)
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
      client.send_command('hget', ['notebooks', key], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(reply))
        }
      })
    })
  }

  /**
   * This gets all of the notebooks in the redis hash.
   *
   * @returns {Promise}
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      client.send_command('hgetall', ['notebooks'], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          let notebooks = []
          if (reply) {
            for (let obj in reply) {
              if (reply.hasOwnProperty(obj)) {
                let notebook = JSON.parse(reply[obj])
                notebooks.push({
                  id: notebook.id,
                  name: notebook.name
                })
                notebooks.sort((a, b) => {
                  return a.name > b.name
                })
              }
            }
          }
          resolve(notebooks)
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
   * @returns {Promise}
   */
  static getNotes(key, sort) {
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        if (response.notes.length) {
          client.send_command('hmget', ['notes', response.notes], (err, reply) => {
            resolve(sortNotes(err, reply, sort, 1, response.name))
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
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        response.notes.push(note)
        return Notebook.persist(response)
      }, (error) => {
        reject(error)
      }).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  /**
   * This removes a note ID from this notebook's array of notes.
   *
   * @param {string} key - The ID of the notebook.
   * @param {string} note - The note to remove.
   * @returns {Promise}
   */
  static removeNote(key, note) {
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        response.notes.splice(response.notes.indexOf(note))
        return Notebook.persist(response)
      }, (error) => {
        reject(error)
      }).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

}

export default Notebook
