/**
 * @fileoverview The actionable items for a notebook
 * @author Chris
 */

import React from 'react'

const style = {
  backgroundColor: '#5bc0de',
  borderColor: '#46b8da',
  color: '#fff'
}

export default React.createClass({
  render() {
    let props = this.props
    return (
      <div className="panel-footer clearfix">
        <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#edit-' + props.notebookId}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
        </button>&nbsp;&nbsp;&nbsp;
        <a className="btn btn-default btn-sm" title="Notes" href={'#' + props.notebookId} style={style}>
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
                  <p>Change the title of this notebook</p>
                  <div className="form-group">
                    <input id="title" className="form-control" name="title" value="" placeholder={props.notebookName} />
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