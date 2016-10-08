/**
 * @fileoverview Redis initialization
 * @author Chris
 */

import redis from 'redis'
import Notebook from './Notebook'

const client = redis.createClient()

client.hgetall('notebooks', (err, reply) => {
  if (!reply || !Object.keys(reply).length) {
    Notebook.persist(new Notebook('default'), (err, res) => {
      if (err) {
        console.error(err)
      }
    })
  }
})

export default client
