/**
 * @fileoverview Schema definition for notes
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'

export default class Note {

  constructor(title, content, notebook) {
    this.id = shortId.generate()
    this.title = title
    this.content = content
    this.notebook = notebook
    this.updated = Date.now()
  }

  static persist(note, callback) {
    client.hset('notes', [`${note.id}`, JSON.stringify(note)], (err, reply) => {
      callback(err, reply)
    })
  }

  static remove(key, callback) {
    client.hdel('notes', key, (err, reply) => {
      callback(err, reply)
    })
  }

  static get(key, callback) {
    client.hget('notes', key, (err, reply) => {
      callback(err, JSON.parse(reply))
    })
  }

  static getAll(callback) {
    client.hgetall('notes', (err, reply) => {
      let notes = []
      if (reply) {
        for (let obj in reply) {
          if (reply.hasOwnProperty(obj)) {
            let note = JSON.parse(reply[obj])
            let time = new Date(note.updated)
            let condensed = note.content.substr(0, 100)
            if (condensed.length === 100) {
              condensed += '...'
            }
            notes.push({
              id: note.id,
              title: note.title,
              summary: condensed,
              content: note.content,
              edited: time.toLocaleString()
            })
          }
        }
      }
      callback(err, notes)
    })
  }

}