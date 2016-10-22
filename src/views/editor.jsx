/**
 * @fileoverview A component for creating a note
 * @author Chris
 */

import React from 'react'
import DefaultLayout from './layouts/default'

export default React.createClass({
  render() {
    return (
      <DefaultLayout>
        <h1>{this.props.title}</h1>
        <br />
        <form className="form-horizontal" role="form" acceptCharset="utf-8" action={this.props.action} method="post">
          <textarea id="note" name="note" style={{display: 'none'}} />
          <div className="form-group">
            <div className="markdown editor">
              <label htmlFor="title">Title</label>
              <input id="title" className="form-control" name="title" defaultValue={this.props.name} />
            </div>
          </div>
          {(() => {
            if (this.props.showNotebooks) {
              let notebooks = this.props.notebooks.map((notebook) => {
                return <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
              })
              return (
                <div className="form-group">
                  <div className="markdown editor">
                    <label htmlFor="notebook">Notebook</label>
                    <select id="notebook" className="form-control" name="notebook">
                      {notebooks}
                    </select>
                  </div>
                </div>
              )
            }
          })()}
          <div className="form-group">
            <div className="markdown editor">
              <textarea id="noteArea" className="form-control" name="noteArea" style={{display: 'none'}} defaultValue={this.props.note} />
            </div>
          </div>
          <div className="form-group">
            <div className="markdown editor">
              <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
            </div>
          </div>
        </form>
      </DefaultLayout>
    )
  }
})

