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
   * This saves a note to the notes hash in redis.
   *
   * @param notebook    The notebook object that is going to be saved to redis.
   * @param fn          A function that gets called after it has been saved.
   *                    It gets passed an error if there was one and the response
   *                    from the redis save operation (1 for new item and 0 for
   *                    an existing one).
   */
  static persist(notebook, fn) {
    client.hset('notebooks', [`${notebook.id}`, JSON.stringify(notebook)], (err, reply) => {
      if (typeof fn === 'function') {
        fn(err, notebook)
      }
    })
  }

  /**
   * This removes a note from the redis hash.
   *
   * @param key   The id of the notebook to be deleted.
   * @param fn    A function that gets called after it has been saved.
   *              It gets passed an error if there was one and the number
   *              of fields that were changed in this operation.
   */
  static remove(key, fn) {
    client.hdel('notebooks', key, (err, reply) => {
      fn(err, reply)
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
    Notebook.get(key, (err, data) => {
      if (err) {
        fn(err)
      } else {
        if (name) {
          data.name = name
        }
        if (notes && notes.length) {
          data.notes = notes
        }
        Notebook.persist(data, fn)
      }
    })
  }

  /**
   * This returns a single notebook.
   *
   * @param key   The id of the notebook.
   * @param fn    The callback function that gets passed the notebook.
   */
  static get(key, fn) {
    client.hget('notebooks', key, (err, reply) => {
      fn(err, JSON.parse(reply))
    })
  }

  /**
   * This gets all of the notebooks in the redis hash.
   *
   * @param fn  The callback that gets passed an array of
   *            notebooks, which is used on several pages.
   */
  static getAll(fn) {
    client.hgetall('notebooks', (err, reply) => {
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
      fn(err, notebooks)
    })
  }

  /**
   * This returns an array sorted by last modification date, of all
   * the notes that belong to this notebook.
   *
   * @param key   The notebook id whose notes this method returns.
   * @param fn    The callback that gets called from within the
   *              {@link #sortNotes} method.
   */
  static getNotes(key, fn) {
    Notebook.get(key, (err, data) => {
      if (err) {
        fn(err)
      } else {
        if (data.notes.length) {
          client.hmget('notes', data.notes, (err, reply) => {
            sortNotes(err, reply, data.name, fn)
          })
        } else {
          sortNotes(err, null, data.name, fn)
        }
      }
    })
  }

  /**
   * This adds a note id to this notebook's list of notes.
   *
   * @param key     The id of the notebook.
   * @param note    The note to add.
   * @param fn      The callback function that gets passed a 1 or a 0.
   */
  static addNote(key, note, fn) {
    Notebook.get(key, (err, data) => {
      if (err) {
        fn(err)
      } else {
        data.notes.push(note)
        Notebook.persist(data)
      }
    })
  }

  /**
   * This removes a note id from this notebook's list of notes.
   *
   * @param key     The id of the notebook.
   * @param note    The note to remove.
   * @param fn      The callback function that gets passed a 1 or a 0.
   */
  static removeNote(key, note, fn) {
    Notebook.get(key, (err, data) => {
      if (err) {
        fn(err)
      } else {
        data.notes.splice(data.notes.indexOf(note))
        Notebook.persist(data)
      }
    })
  }

}

export default Notebook
