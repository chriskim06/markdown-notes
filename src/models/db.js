/**
 * @fileoverview Redis initialization
 * @author Chris
 */

import redis from 'redis'
import Notebook from './Notebook'
import { exec } from 'child_process'

/**
 * Start redis server from within the application
 */
exec('redis-server ../redis.conf', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
  } else {
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  }
})

const client = redis.createClient()

client.on('connect', () => {
  console.log('Connected')
})
client.on('error', (err) => {
  console.log(`Error: ${err}`)
})

/**
 * Initialize with one notebook if the hash is empty
 */
client.hgetall('notebooks', (err, reply) => {
  if (!reply || !Object.keys(reply).length) {
    Notebook.persist(new Notebook('default')).then((response) => {
      console.log(`Saved new notebook: ${response}`)
    }, (error) => {
      console.error(error)
    })
  }
})

export default client
