/**
 * @fileoverview The title of the notebook
 * @author Chris
 */

import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="panel-body">
        <p className="noteCondensed">{this.props.notebookName}</p>
      </div>
    )
  }
})