/**
 * @fileoverview Default layout
 * @author Chris
 */

var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Notes</title>
          <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
          <link rel="stylesheet" href="/stylesheets/simple-sidebar.css" />
          <link rel="stylesheet" href="/stylesheets/simplemde.min.css" />
          <script src="/javascripts/simplemde.min.js"></script>
          <script src="/javascripts/jquery.js"></script>
          <script src="/javascripts/bootstrap.min.js"></script>
        </head>
        <body>
          <div id="wrapper">
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                <li className="sidebar-brand">
                  <p className="sidebar-brand-title">Notes App</p>
                </li>
                <li><a href="/">Notebooks</a></li>
                <li><a href="/notes">Manage notes</a></li>
                <li><a href="/create">Add a new note</a></li>
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
    );
  }
});

module.exports = DefaultLayout;
