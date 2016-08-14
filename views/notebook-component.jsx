/**
 * @fileoverview A component that represents a single notebook
 * @author Chris
 */

import React from 'react'

export default React.createClass({
  render() {
    let notebookId = this.props.data.id
    let notebookName = this.props.data.name
    return (
      <div className="panel panel-default">
        <NotebookName notebookName={notebookName} />
        <NotebookActions notebookName={notebookName} notebookId={notebookId} />
      </div>
    )
  }
})

let NotebookName = React.createClass({
  render() {
    return (
      <div className="panel-body">
        <p className="noteCondensed">{this.props.notebookName}</p>
      </div>
    )
  }
})

let NotebookActions = React.createClass({
  render() {
    let props = this.props
    return (
      <div className="panel-footer clearfix">
        <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#edit-' + props.notebookId}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
        </button>&nbsp;&nbsp;&nbsp;
        <a className="btn btn-default btn-sm" title="Notes" href={'#' + props.notebookId}>
          <i className="fa fa-plus-square fa-lg" aria-hidden="true" />&nbsp;Notes
        </a>&nbsp;&nbsp;&nbsp;
        <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#delete-' + props.notebookId}>
          <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
        </button>&nbsp;&nbsp;&nbsp;
        <div id={'edit-' + props.notebookId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form acceptCharset="utf-8" action="/notebooks/edit" method="post">
                  <input id="notebookId" name="notebookId" type="hidden" value={props.notebookId} />
                  <div className="form-group">
                    <input id="title" className="form-control" name="title" value="" placeholder="Name..." />
                  </div>
                  <div className="form-group">
                    <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id={'delete-' + props.notebookId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form acceptCharset="utf-8" action="/notebooks/delete" method="post">
                  <input id="notebookId" name="notebookId" type="hidden" value={props.notebookId} />
                  <p>Are you sure you want to delete the note '{props.notebookName}'</p>
                  <div className="form-group">
                    <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Confirm" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
