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

class NoteComponent extends React.Component {
  render() {
    let data = this.props.data
    let date = new Date(data.updated).toLocaleString()
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">
              <span className="note-title" data-tooltip={'Updated: ' + date} data-tooltip-position="right">
                {data.title}
              </span>
            </h3>
          </div>
          <div className="panel-body">
            <p className="noteCondensed">{data.content}</p>
          </div>
          <div className="panel-footer clearfix">
            <a className="btn btn-default btn-sm nb-actions" title="Edit" style={style} href={'/editor/update/' + data.id}>
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
}

export default NoteComponent
