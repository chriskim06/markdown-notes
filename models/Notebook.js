/**
 * @fileoverview Notebook definition and methods
 * @author Chris
 */

import client from './db'
import shortId from 'shortid'

export default class Notebook {

  constructor(name, notes = []) {
    this.id = shortId.generate()
    this.name = name
    this.notes = notes
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
          }
        }
      }
      callback(err, notebooks)
    })
  }

}
