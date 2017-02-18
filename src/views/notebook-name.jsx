/**
 * @fileoverview The title of the notebook
 * @author Chris
 */

import React from 'react'

class NotebookName extends React.Component {
  render() {
    return (
      <div className="panel-body">
        <p className="noteCondensed">{this.props.notebookName}</p>
      </div>
    )
  }
}

export default NotebookName
