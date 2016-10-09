/**
 * @fileoverview Note definition and methods
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'
import Notebook from '../models/Notebook'

class Note {

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

  static update(key, title, notebook, content, callback) {
    Note.get(key, (err, data) => {
      if (err) {
        callback(err)
      } else {
        if (data.notebook !== notebook) {
          Notebook.removeNote(data.notebook, data.id)
          Notebook.addNote(notebook, data.id)
        }
        data.title = title
        data.notebook = notebook
        data.content = content
        data.updated = Date.now()
        Note.persist(data, callback)
      }
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
            notes.sort((a, b) => {
              return a.edited < b.edited
            })
          }
        }
      }
      callback(err, notes)
    })
  }

}

export default Note
