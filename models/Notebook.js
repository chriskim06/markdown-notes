/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'
import { sortNotes } from '../util/handler'

class Notebook {

  constructor(name, notes = []) {
    this.id = shortId.generate()
    this.name = name
    this.notes = notes
  }

  static persist(notebook, callback) {
    client.hset('notebooks', [`${notebook.id}`, JSON.stringify(notebook)], (err, reply) => {
      if (typeof callback === 'function') {
        callback(err, reply)
      }
    })
  }

  static remove(key, callback) {
    client.hdel('notebooks', key, (err, reply) => {
      callback(err, reply)
    })
  }

  static update(key, name, callback) {
    Notebook.get(key, (err, data) => {
      if (err) {
        callback(err)
      } else {
        data.name = name
        Notebook.persist(data, callback)
      }
    })
  }

  static get(key, callback) {
    client.hget('notebooks', key, (err, reply) => {
      callback(err, JSON.parse(reply))
    })
  }

  static getAll(callback) {
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
      callback(err, notebooks)
    })
  }

  static getAllNotes(key, callback) {
    Notebook.get(key, (err, data) => {
      if (err) {
        callback(err)
      } else {
        if (data.notes.length) {
          client.hmget('notes', data.notes, (err, reply) => {
            sortNotes(err, reply, data.name, callback)
          })
        } else {
          sortNotes(err, null, data.name, callback)
        }
      }
    })
  }

  static addNote(key, note, callback) {
    Notebook.get(key, (err, data) => {
      if (err) {
        callback(err)
      } else {
        data.notes.push(note)
        Notebook.persist(data)
      }
    })
  }

  static removeNote(key, note, callback) {
    Notebook.get(key, (err, data) => {
      if (err) {
        callback(err)
      } else {
        data.notes.splice(data.notes.indexOf(note))
        Notebook.persist(data)
      }
    })
  }

}

export default Notebook
