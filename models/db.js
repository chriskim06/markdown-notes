/**
 * @fileoverview Redis initialization
 * @author Chris
 */

import redis from 'redis'

const client = redis.createClient()

export default client
