/**
 * @fileoverview A component that represents a single note
 * @author Chris
 */

import React from 'react'
import DeleteModal from './delete-modal'
import NotePreview from './note-preview'

const style = {
  backgroundColor: '#5bc0de',
  borderColor: '#46b8da',
  color: '#fff'
}

export default React.createClass({
  render() {
    let data = this.props.data
    let edited = new Date(parseInt(data.edited, 10)).toLocaleString()
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">
              {'(' + edited + ') '}<span className="note-title">{data.title}</span>
            </h3>
          </div>
          <div className="panel-body">
            <p className="noteCondensed">{data.summary}</p>
          </div>
          <div className="panel-footer clearfix">
            <a className="btn btn-default btn-sm nb-actions" title="Edit" style={style} href={'/editor/update/' + data.id + '/' + this.props.notebook}>
              <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
            </a>
            <button className="btn btn-info btn-sm nb-actions" type="button" data-toggle="modal" data-target={'#preview-' + data.id}>
              <i className="fa fa-eye fa-lg" aria-hidden="true" />&nbsp;View
            </button>
            <button className="btn btn-info btn-sm nb-actions" type="button" data-toggle="modal" data-target={'#delete-' + data.id}>
              <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
            </button>
          </div>
        </div>
        <DeleteModal data={data} origin="notes" />
        <NotePreview data={data} />
      </div>
    )
  }
})
