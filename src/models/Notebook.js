/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'
import { sortNotes } from '../util/handler'

/**
 * Class that represents a notebook
 *
 * @class
 */
class Notebook {

  /**
   * Notebooks are simple; they only have a title and a list of
   * the notes that are a part of the notebook.
   *
   * @constructor
   * @param name
   * @param notes
   */
  constructor(name, notes = []) {
    this.id = shortId.generate()
    this.name = name
    this.notes = notes
  }

  /**
   * This saves a note to the notes hash in redis and returns a Promise.
   *
   * @param notebook  The notebook object that is going to be saved to redis.
   */
  static persist(notebook) {
    return new Promise((resolve, reject) => {
      client.hset('notebooks', [`${notebook.id}`, JSON.stringify(notebook)], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(notebook)
        }
      })
    })
  }

  /**
   * This removes a note from the redis hash and returns a Promise.
   *
   * @param key   The id of the notebook to be deleted.
   */
  static remove(key) {
    return new Promise((resolve, reject) => {
      client.hdel('notebooks', key, (err, reply) => {
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
   * @param key     The id of the notebook to update.
   * @param name    The new title to set.
   * @param notes   The new notebook to set.
   * @param fn      A function that gets called after it has been saved.
   *                It gets passed an error if there was one and the number
   *                of fields that were changed in this operation.
   */
  static update(key, name, notes, fn) {
    Notebook.get(key).then((response) => {
      if (name) {
        response.name = name
      }
      if (notes && notes.length) {
        response.notes = notes
      }
      return Notebook.persist(response)
    }, (error) => {
      fn(error, null)
    }).then((response) => {
      fn(null, response)
    }, (error) => {
      fn(error, null)
    })
  }

  /**
   * This returns a single notebook and returns a Promise.
   *
   * @param key   The id of the notebook.
   */
  static get(key) {
    return new Promise((resolve, reject) => {
      client.hget('notebooks', key, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(reply))
        }
      })
    })
  }

  /**
   * This gets all of the notebooks in the redis hash and returns a Promise.
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      client.hgetall('notebooks', (err, reply) => {
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
   * This returns a Promise that resolves an array of all the notes
   * that belong to this notebook sorted by last modification date.
   *
   * @param key   The notebook id whose notes this method returns.
   */
  static getNotes(key) {
    return new Promise((resolve, reject) => {
      Notebook.get(key).then((response) => {
        if (response.notes.length) {
          client.hmget('notes', response.notes, (err, reply) => {
            resolve(sortNotes(err, reply, response.name))
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
   * This adds a note id to this notebook's list of notes and returns a Promise.
   *
   * @param key     The id of the notebook.
   * @param note    The note to add.
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
   * This removes a note id from this notebook's list of notes and returns a Promise.
   *
   * @param key     The id of the notebook.
   * @param note    The note to remove.
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
