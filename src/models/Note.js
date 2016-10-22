/**
 * @fileoverview Note definition and methods
 * @author Chris
 */

import client from './db'
import Notebook from './Notebook'
import { sortNotes, resolvePromise, uuid } from '../util/helper'

/**
 * Describes notes and contains methods for handling them.
 */
class Note {

  /**
   * This instantiates a single note which can later be saved in redis.
   * There are two fields that are not set in the constructor: a unique
   * id and the time this note was last modified.
   *
   * @constructor
   * @param {string} title - The title of the note.
   * @param {string} content - The markdown contents of the note.
   */
  constructor(title, content) {
    this.id = uuid()
    this.title = title
    this.content = content
    this.updated = Date.now()
  }

  /**
   * This saves a note to the notes hash in redis.
   *
   * @returns {Promise}
   */
  persist() {
    return new Promise((resolve, reject) => {
      client.send_command('hset', ['notes', `${this.id}`, JSON.stringify(this)], (err) => {
        resolvePromise(err, this, resolve, reject)
      })
    })
  }

  /**
   * This removes a note from the redis hash.
   *
   * @param {string} key - The ID of the note to be deleted.
   * @returns {Promise}
   */
  static remove(key) {
    return new Promise((resolve, reject) => {
      client.send_command('hdel', ['notes', key], (err, reply) => {
        resolvePromise(err, reply, resolve, reject)
      })
    })
  }

  /**
   * This saves new fields to an existing note object. Only non null
   * and non empty values overwrite the previous ones.
   *
   * @param {string} key - The ID of the note to update.
   * @param {string} title - The new title to set.
   * @param {string} notebook - The new notebook ID to set.
   * @param {string} content - The content to set.
   */
  static update(key, title, notebook, content) {
    const p1 = Notebook.get(notebook)
    const p2 = Note.get(key)
    return Promise.all([p1, p2]).then((response) => {
      if (response[0] && !response[0].notes.includes(key)) {
        Notebook.addNote(notebook, key)
      }
      response[1].title = title
      response[1].content = content
      response[1].updated = Date.now()
      return response[1].persist()
    }, (error) => {
      return Promise.reject(error)
    })
  }

  /**
   * This gets a single note object from the notes hash.
   *
   * @param key - The ID of the note.
   * @returns {Promise}
   */
  static get(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        resolve(null)
      } else {
        client.send_command('hget', ['notes', key], (err, reply) => {
          resolvePromise(err, Object.setPrototypeOf(JSON.parse(reply), Note.prototype), resolve, reject)
        })
      }
    })
  }

  /**
   * This gets all of the notes from the notes hash.
   *
   * @param {string} sort - The property to sort the notes by.
   * @param {number} asc - Sorts ascending if this is a truthy value.
   * @returns {Promise}
   */
  static getAll(sort, asc) {
    return new Promise((resolve, reject) => {
      client.send_command('hgetall', ['notes'], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          let allNotes = []
          for (let note in reply) {
            if (reply.hasOwnProperty(note)) {
              allNotes.push(reply[note])
            }
          }
          resolve(sortNotes(reply, sort, asc, null).notes)
        }
      })
    })
  }

}

export default Note
