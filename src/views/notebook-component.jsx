/**
 * @fileoverview A component that represents a single notebook
 * @author Chris
 */

import React from 'react'
import NotebookName from './notebook-name'
import NotebookActions from './notebook-actions'

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
