/**
 * @fileoverview Default layout
 * @author Chris
 */

import React from 'react'

export default React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>Notes</title>
          <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
          <link rel="stylesheet" href="/stylesheets/simple-sidebar.css" />
          <link rel="stylesheet" href="/stylesheets/simplemde.min.css" />
          <link rel="stylesheet" href="/font-awesome-4.6.3/css/font-awesome.min.css" />
          <script src="/javascripts/simplemde.min.js"></script>
          <script src="/javascripts/jquery.js"></script>
          <script src="/javascripts/bootstrap.min.js"></script>
          <script src="/javascripts/simplemde-helpers.js"></script>
        </head>
        <body>
          <div id="wrapper">
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                <li className="sidebar-brand">
                  <a href="/">
                    <img src="/images/markdown.png" />
                  </a>
                </li>
                <li><a href="/"><i className="fa fa-book fa-lg" aria-hidden="true" />&nbsp;&nbsp;Notebooks</a></li>
                <li><a href="/notes"><i className="fa fa-file-text fa-lg" aria-hidden="true" />&nbsp;&nbsp;Notes</a></li>
                <li><a href="/editor/add"><i className="fa fa-plus-square fa-lg" aria-hidden="true" />&nbsp;&nbsp;Add a new note</a></li>
              </ul>
            </div>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                {this.props.children}
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }
})

