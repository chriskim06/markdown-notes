/**
 * @fileoverview A component that displays notes
 * @author Chris
 */

import React from 'react'
import NoteComponent from './note-component'
import DefaultLayout from './layouts/default'

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: this.props.selected}
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  render() {
    let content = this.props.notes.map((note) => {
      return <NoteComponent key={note.id} data={note} notebook={this.props.id} />
    })
    let notes = this.props.all.map((note) => {
      return <option key={note.id} value={note.id}>{note.title}</option>
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
        {(() => {
          if (this.props.all.length) {
            let style = {height: `${Math.min(Math.max(this.props.all.length * 20, 100), 300)}px`}
            return (
              <div id="manageNotes" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      <form acceptCharset="utf-8" action="/notebooks/notes/update" method="post">
                        <input id="notebookId" name="notebookId" type="hidden" value={this.props.id} />
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                          <select id="notes"
                                  name="notes"
                                  className="form-control"
                                  style={style}
                                  value={this.props.selected}
                                  onChange={this.handleChange}
                                  multiple>
                            {notes}
                          </select>
                        </div>
                        <div className="form-group">
                          <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })()}
        <div>
          {content}
        </div>
      </DefaultLayout>
    )
  }
}

export default Notes
