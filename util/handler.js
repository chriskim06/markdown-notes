/**
 * @fileoverview Functions to be used in callbacks
 * @author Chris
 */

export const redirect = (err, res, next, path) => {
  if (err) {
    next(err)
  } else {
    res.redirect(path)
  }
}

export const render = (err, res, next, view, data) => {
  if (err) {
    next(err)
  } else {
    res.render(view, data)
  }
}
