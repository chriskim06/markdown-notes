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
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">{'(' + data.edited + ') ' + data.title}</h3>
          </div>
          <div className="panel-body">
            <p className="noteCondensed">{data.summary}</p>
          </div>
          <div className="panel-footer clearfix">
            <a className="btn btn-default btn-sm actions" title="Edit" style={style} href={'/editor/update/' + data.id}>
              <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
            </a>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#preview-' + data.id}>
              <i className="fa fa-eye fa-lg" aria-hidden="true" />&nbsp;View
            </button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#delete-' + data.id}>
              <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
            </button>&nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <DeleteModal data={data} origin="notes" />
        <NotePreview data={data} />
      </div>
    )
  }
})
