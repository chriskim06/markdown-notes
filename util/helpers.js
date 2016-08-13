/**
 * @fileoverview Convenience methods that are used everywhere
 * @author Chris
 */

module.exports = {
  doNext: function(err, res, next, data, callback) {
    if (err) {
      next(err);
    } else {
      callback(res, next, data);
    }
  }
};
