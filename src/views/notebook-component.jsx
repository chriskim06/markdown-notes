/**
 * @fileoverview A component that represents a single notebook
 * @author Chris
 */

import React from 'react'
import NotebookName from './notebook-name'
import NotebookActions from './notebook-actions'

class NotebookComponent extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <NotebookName notebookName={this.props.data.title} />
        <NotebookActions notebookName={this.props.data.title} notebookId={this.props.data._id} />
      </div>
    )
  }
}

export default NotebookComponent
