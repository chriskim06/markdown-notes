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
        <a className="btn btn-default btn-sm" title="Edit" href={'#' + this.props.notebookIdentifier}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
        </a>&nbsp;&nbsp;&nbsp;
        <a className="btn btn-default btn-sm" title="Notes" href={'#' + this.props.notebookIdentifier}>
          <i className="fa fa-file-text fa-lg" aria-hidden="true" />&nbsp;Notes
        </a>&nbsp;&nbsp;&nbsp;
        <a className="btn btn-default btn-sm" title="Delete" href={'#' + this.props.notebookIdentifier}>
          <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
        </a>
      </div>
    );
  }
});

module.exports = Notebook;