/**
 * @fileoverview Main page
 * @author Chris
 */

import React from 'react'
import DefaultLayout from './layouts/default'
import NotebookComponent from './notebook-component'
import AddNotebook from './add-notebook'

export default React.createClass({
  render() {
    let content = this.props.notebookNames.map((notebook) => {
      return <NotebookComponent key={notebook.id} data={notebook} />
    })
    return (
      <DefaultLayout>
        <div>
          <h1 className="notebooks">Notebooks</h1>
          <button className="btn btn-info btn-sm notebooks" type="button" data-toggle="modal" data-target="#addNotebook">
            Add Notebook
          </button>
        </div>
        <br />
        <div>
          {content}
        </div>
        <AddNotebook />
      </DefaultLayout>
    )
  }
})
