/**
 * @fileoverview Schema definition for notebooks
 * @author Chris
 */

import client from './db'
import shortid from 'shortid'

export default class Notebook {

  constructor(name, notes = []) {
    this.id = shortid.generate()
    this.name = name
    this.notes = notes
  }

  setName(name) {
    this.name = name
  }

  addNote(note) {
    this.notes.push(note)
  }

  static persist(notebook, callback) {
    client.hset('notebooks', [`${notebook.id}`, JSON.stringify(notebook)], (err, reply) => {
      callback(err, reply)
    })
  }

  static remove(key, callback) {
    client.hdel('notebooks', key, (err, reply) => {
      callback(err, reply)
    })
  }

  static getNotebook(key, callback) {
    client.hget('notebooks', key, (err, reply) => {
      callback(err, JSON.parse(reply))
    })
  }

  static getAllNotebooks(callback) {
    client.hgetall('notebooks', (err, reply) => {
      let notebooks = []
      if (reply) {
        // let notebookObjects = JSON.parse(reply)
        for (let obj in reply) {
          if (reply.hasOwnProperty(obj)) {
            let notebook = JSON.parse(reply[obj])
            notebooks.push({
              id: notebook.id,
              name: notebook.name
            })
          }
        }
      }
      callback(err, notebooks)
    })
  }

}
