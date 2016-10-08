/**
 * @fileoverview Redis initialization
 * @author Chris
 */

import redis from 'redis'
import Notebook from './Notebook'
import { exec } from 'child_process'

exec('redis-server redis.conf', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})

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
