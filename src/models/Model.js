/**
 * @fileoverview Superclass for data classes
 * @author Chris
 */

import client from './db'
import { resolvePromise, cast, uuid } from '../util/helper'

class Model {

  /**
   * This is the most basic requirement for persisted models.
   * @constructor
   * @param {string} hashkey - The model's key prefix (for uniquely identifying them).
   * @param {string} setkey - The prefix for the set that holds the model IDs.
   */
  constructor(hashkey, setkey) {
    this.id = uuid()
    this.hashkey = hashkey
    this.setkey = setkey
  }

  /**
   * This saves a model as a hash in redis.
   * @returns {Promise}
   */
  persist() {
    return new Promise((resolve, reject) => {
      client.send_command('hmset', [`${this.hashkey}:${this.id}`, this], (err) => {
        if (!err) {
          client.send_command('sadd', [this.setkey, this.id])
        }
        resolvePromise(err, this, resolve, reject)
      })
    })
  }

  /**
   * This removes a model from redis.
   * @param {string} key - The ID of the notebook to be deleted.
   * @param {string} hashkey - The model's key prefix (for uniquely identifying them).
   * @param {string} setkey - The prefix for the set that holds the model IDs.
   * @returns {Promise}
   */
  static remove(key, hashkey, setkey) {
    return new Promise((resolve, reject) => {
      client.multi([
        ['del', `${hashkey}:${key}`],
        ['srem', setkey, key]
      ]).exec((err, replies) => {
        resolvePromise(err, replies[0], resolve, reject)
      })
    })
  }

  /**
   * This gets an instance of the model from redis.
   * @param {string} key - The ID of the notebook.
   * @param {string} hashkey - The model's key prefix (for uniquely identifying them).
   * @param {Object} prototype - The prototype of the object to cast to.
   * @returns {Promise}
   */
  static get(key, hashkey, prototype) {
    return new Promise((resolve, reject) => {
      if (!key) {
        resolve(null)
      } else {
        client.send_command('hgetall', [`${hashkey}:${key}`], (err, reply) => {
          resolvePromise(err, cast(reply, prototype), resolve, reject)
        })
      }
    })
  }

  /**
   * This gets all instances of the model from redis.
   * @param {string} hashkey - The model's key prefix (for uniquely identifying them).
   * @param {string} setkey - The prefix for the set that holds the model IDs.
   * @param {function} callback - The callback function to execute. It gets passed the
   *                              output of the redis {@link Multi#exec} command.
   */
  static getAll(hashkey, setkey, callback) {
    client.send_command('smembers', [setkey], (err, reply) => {
      if (err) {
        callback(err)
      } else if (reply && reply.length) {
        let cmds = []
        reply.forEach((id) => {
          cmds.push(['hgetall', `${hashkey}:${id}`])
        })
        client.multi(cmds).exec((err, replies) => {
          callback(err, replies)
        })
      } else {
        callback(null)
      }
    })
  }

}

export default Model
