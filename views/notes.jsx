/**
 * @fileoverview A component that displays notes
 * @author Chris
 */

import React from 'react'
import NoteComponent from './note-component'
import DefaultLayout from './layouts/default'

export default React.createClass({
  render() {
    let content = this.props.notes.map((note) => {
      return <NoteComponent key={note.id} data={note} />
    })
    return (
      <DefaultLayout>
        <div>
          <h1 className="notebooks">{this.props.title}</h1>
          {(() => {
            if (this.props.button) {
              return (
                <button className="btn btn-info btn-sm notebooks" type="button" data-toggle="modal" data-target="#manageNotes">
                  Manage Notes
                </button>
              )
            }
          })()}
        </div>
        <br />
        <div>
          {content}
        </div>
      </DefaultLayout>
    )
  }
})
