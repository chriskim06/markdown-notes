/**
 * @fileoverview The markdown preview of a note
 * @author Chris
 */

import React from 'react'

class NotePreview extends React.Component {
  render() {
    let data = this.props.data
    return (
      <div id={'preview-' + data.id} className="modal fade preview" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <textarea id={'note-' + data.id} name="note" style={{display: 'none'}} defaultValue={data.content} />
              <div className="markdown editor">
                <textarea id={'noteArea-' + data.id} className="form-control" name="noteArea" style={{display: 'none'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotePreview
