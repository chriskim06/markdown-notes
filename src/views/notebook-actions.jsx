/**
 * @fileoverview The actionable items for a notebook
 * @author Chris
 */

import React from 'react'
import DeleteModal from './delete-modal'

const style = {
  backgroundColor: '#5bc0de',
  borderColor: '#46b8da',
  color: '#fff'
}

class NotebookActions extends React.Component {
  render() {
    let props = this.props
    return (
      <div className="panel-footer clearfix">
        <button className="btn btn-info btn-sm nb-actions" type="button" data-toggle="modal" data-target={'#edit-' + props.notebookId}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
        </button>
        <a className="btn btn-default btn-sm nb-actions" title="Notes" href={'/notebooks/notes/' + props.notebookId} style={style}>
          <i className="fa fa-plus-square fa-lg" aria-hidden="true" />&nbsp;Notes
        </a>
        <button className="btn btn-info btn-sm nb-actions" type="button" data-toggle="modal" data-target={'#delete-' + props.notebookId}>
          <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
        </button>
        <div id={'edit-' + props.notebookId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form acceptCharset="utf-8" action="/notebooks/edit" method="post">
                  <input id="notebookId" name="notebookId" type="hidden" value={props.notebookId} />
                  <p>Change the title of this notebook</p>
                  <div className="form-group">
                    <input id="title" className="form-control" name="title" defaultValue={props.notebookName} placeholder={props.notebookName} />
                  </div>
                  <div className="form-group">
                    <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <DeleteModal data={{id: props.notebookId, title: props.notebookName}} origin="notebooks" />
      </div>
    )
  }
}

export default NotebookActions
