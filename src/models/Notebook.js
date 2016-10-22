/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import { sortNotes, resolvePromise, uuid } from '../util/helper'

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
   * @returns {Promise}
   */
  persist() {
    return new Promise((resolve, reject) => {
      client.send_command('hset', ['notebooks', `${this.id}`, JSON.stringify(this)], (err) => {
        resolvePromise(err, this, resolve, reject)
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
        resolvePromise(err, reply, resolve, reject)
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
      return response.persist()
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
      if (!key) {
        resolve(null)
      } else {
        client.send_command('hget', ['notebooks', key], (err, reply) => {
          resolvePromise(err, Object.setPrototypeOf(JSON.parse(reply), Notebook.prototype), resolve, reject)
        })
      }
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
                notebooks.push(Object.setPrototypeOf(JSON.parse(reply[obj]), Notebook.prototype))
              }
            }
            notebooks.sort((a, b) => a.name > b.name)
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
   * @param {number} asc - Sorts ascending if this is a truthy value.
   * @returns {Promise}
   */
  static getNotes(key, sort, asc) {
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        if (response.notes.length) {
          client.send_command('hmget', ['notes', response.notes], (err, reply) => {
            resolve(sortNotes(reply, sort, asc, response.name))
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
      response.notes.push(note)
      return response.persist()
    }, (error) => {
      return Promise.reject(error)
    })
  }

}

export default Notebook
