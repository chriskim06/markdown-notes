/**
 * @fileoverview Convenience methods that are used everywhere
 * @author Chris
 */


/**
 * Simple function that will either pass the error along or call the callback
 * @param err
 * @param res
 * @param next
 * @param data
 * @param callback
 */
export const doNext = (err, res, next, data, callback) => {
  if (err) {
    next(err)
  } else {
    callback(res, next, data)
  }
}
