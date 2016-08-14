/**
 * @fileoverview A component that represents a single note
 * @author Chris
 */

import React from 'react'

export default React.createClass({
  render() {
    let data = this.props.data
    return (
      <div>
        <form role="form" acceptCharset="utf-8" action={'/notes/delete/' + data.id} method="post">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">{'(' + data.edited + ') ' + data.title}</h3>
            </div>
            <div className="panel-body">
              <p className="noteCondensed">{data.summary}</p>
            </div>
            <div className="panel-footer clearfix">
              <a className="btn btn-default btn-sm actions" title="Edit" href={'/editor/update/' + data.id}>
                <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
              </a>&nbsp;&nbsp;&nbsp;
              <a className="btn btn-default btn-sm actions" title="View" href={'/preview/' + data.id}>
                <i className="fa fa-eye fa-lg" aria-hidden="true" />&nbsp;View
              </a>&nbsp;&nbsp;&nbsp;
              <a className="btn btn-default btn-sm actions" title="Delete" href={'/preview/' + data.id}>
                <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
              </a>
            </div>
          </div>
        </form>
      </div>
    )
  }
})
