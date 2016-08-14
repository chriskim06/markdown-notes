/**
 * @fileoverview A component for creating a note
 * @author Chris
 */

import React from 'react'
import DefaultLayout from './layouts/default'

export default React.createClass({
  render() {
    let props = this.props
    return (
      <DefaultLayout>
        <h1>{props.title}</h1>
        <br />
        <form className="form-horizontal" role="form" acceptCharset="utf-8" action={props.action} method="post">
          <textarea id="note" name="note" style={{display: 'none'}} />
          <div className="form-group">
            <div className="markdown editor">
              <input id="title" className="form-control" name="title" value={props.name} placeholder="Title..." />
            </div>
          </div>
          <div className="form-group">
            <div className="markdown editor">
              <textarea id="noteArea" className="form-control" name="noteArea" style={{display: 'none'}} value={props.note} />
            </div>
          </div>
          <div className="form-group">
            <div className="markdown editor">
              <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
            </div>
          </div>
        </form>
      </DefaultLayout>
    )
  }
})

