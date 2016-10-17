/**
 * @fileoverview Note definition and methods
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'
import Notebook from './Notebook'
import { sortNotes } from '../util/handler'

/**
 * Class that represents a note
 *
 * @class
 */
class Note {

  /**
   * This instantiates a single note which can later be saved in redis.
   * There are two fields that are not set in the constructor: a unique
   * id and the time this note was last modified.
   *
   * @constructor
   * @param title      The title of the note.
   * @param content    The markdown contents of the note.
   * @param notebook   The id of the notebook this note is in.
   */
  constructor(title, content, notebook) {
    this.id = shortId.generate()
    this.title = title
    this.content = content
    this.notebook = notebook
    this.updated = Date.now()
  }

  /**
   * This saves a note to the notes hash in redis and returns a Promise.
   *
   * @param note  The note object that is going to be saved to redis.
   */
  static persist(note) {
    return new Promise((resolve, reject) => {
      client.hset('notes', [`${note.id}`, JSON.stringify(note)], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(note)
        }
      })
    })
  }

  /**
   * This removes a note from the redis hash and returns a Promise.
   *
   * @param key   The id of the note to be deleted.
   */
  static remove(key) {
    return new Promise((resolve, reject) => {
      client.hdel('notes', key, (err, reply) => {
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
   * @param key        The id of the note to update.
   * @param title      The new title to set.
   * @param notebook   The new notebook to set.
   * @param content    The content to set.
   * @param fn         A function that gets called after it has been saved.
   *                   It gets passed an error if there was one and the number
   *                   of fields that were changed in this operation.
   */
  static update(key, title, notebook, content, fn) {
    Note.get(key, (err, data) => {
      if (err) {
        fn(err)
      } else {
        if (data.notebook !== notebook) {
          Notebook.addNote(notebook, data.id)
        }
        data.title = title
        data.notebook = notebook
        data.content = content
        data.updated = Date.now()
        Note.persist(data).then((response) => {
          fn(null, response)
        }, (error) => {
          fn(error, null)
        })
      }
    })
  }

  /**
   * This gets a single note object from the notes hash.
   *
   * @param key   The id of the note.
   * @param fn    A function that gets called after it has been saved.
   *              It gets passed an error if there was one and the number
   *              of fields that were changed in this operation.
   */
  static get(key, fn) {
    client.hget('notes', key, (err, reply) => {
      fn(err, JSON.parse(reply))
    })
  }

  /**
   * This gets all of the notes from the notes hash.
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      client.hgetall('notes', (err, reply) => {
        if (err) {
          reject(err)
        } else {
          let allNotes = []
          for (let note in reply) {
            if (reply.hasOwnProperty(note)) {
              allNotes.push(note)
            }
          }
          resolve({
            notes: sortNotes(err, reply, null),
            all: allNotes
          })
        }
      })
    })
  }

}

export default Note
