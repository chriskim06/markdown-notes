/**
 * @fileoverview Note definition and methods
 * @author Chris
 */

import client from './db'
import Notebook from './Notebook'
import { sortNotes, resolvePromise, cast, uuid } from '../util/helper'

const n = 'notes'
const n_set = 'notes_id_set'

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
      client.send_command('hmset', [`${n}:${this.id}`, this], (err) => {
        if (!err) {
          client.send_command('sadd', [n_set, this.id])
        }
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
      client.multi([
        ['del', `${n}:${key}`],
        ['srem', n_set, key]
      ]).exec((err, replies) => {
        resolvePromise(err, replies[0], resolve, reject)
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
    }, (error) => {
      Promise.reject(error)
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
        client.send_command('hgetall', [`${n}:${key}`], (err, reply) => {
          resolvePromise(err, cast(reply, Note.prototype), resolve, reject)
        })
      }
    })
  }

  /**
   * This gets all of the notes from redis.
   *
   * @param {string} sort - The property to sort the notes by.
   * @param {number} asc - Sorts ascending if this is a truthy value.
   * @returns {Promise}
   */
  static getAll(sort, asc) {
    return new Promise((resolve, reject) => {
      client.send_command('smembers', [n_set], (err, reply) => {
        if (err) {
          reject(err)
        } else {
          if (reply && reply.length) {
            let cmds = []
            reply.forEach((id) => {
              cmds.push(['hgetall', `${n}:${id}`])
            })
            client.multi(cmds).exec((err, replies) => {
              resolve(sortNotes(replies, sort, asc))
            })
          } else {
            resolve(null)
          }
        }
      })
    })
  }

}

export default Note
