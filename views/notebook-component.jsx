/**
 * @fileoverview A component that represents a single notebook
 * @author Chris
 */

var React = require('react');

var Notebook = React.createClass({
  render: function() {
    var notebookId = this.props.data.id;
    var notebookName = this.props.data.name;
    return (
      <div className="panel panel-default">
        <NotebookName notebookTitle={notebookName} />
        <NotebookActions notebookIdentifier={notebookId} />
      </div>
    );
  }
});

var NotebookName = React.createClass({
  render: function() {
    return (
      <div className="panel-body">
        <p className="noteCondensed">{this.props.notebookTitle}</p>
      </div>
    );
  }
});

var NotebookActions = React.createClass({
  render: function() {
    return (
      <div className="panel-footer clearfix">
        <a className="btn btn-default btn-sm" href={'#' + this.props.notebookIdentifier}>Edit</a>
        <a className="btn btn-default btn-sm" href={'#' + this.props.notebookIdentifier}>Notes</a>
        <a className="btn btn-default btn-sm" href={'#' + this.props.notebookIdentifier}>Delete</a>
      </div>
    );
  }
});

module.exports = Notebook;