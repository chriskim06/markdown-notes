/**
 * @fileoverview Generic modal confirmation for deleting notes/notebooks
 * @author Chris
 */

import React from 'react'

export default React.createClass({
  render() {
    return (
      <div id={'delete-' + this.props.data.id} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form acceptCharset="utf-8" action={'/' + this.props.origin + '/delete/' + this.props.data.id} method="post">
                <input id="noteId" name="noteId" type="hidden" value={this.props.data.id} />
                <p>Are you sure you want to delete the {this.props.origin.slice(0, -1)} '{this.props.data.title}'</p>
                <div className="form-group">
                  <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Confirm" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
})