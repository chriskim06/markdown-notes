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
        <h1>All Notes</h1>
        <br />
        {content}
      </DefaultLayout>
    )
  }
})
