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
        <NotebookActions notebookTitle={notebookName} notebookId={notebookId} />
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
        <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#edit-' + this.props.notebookId}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />&nbsp;Edit
        </button>&nbsp;&nbsp;&nbsp;
        <a className="btn btn-default btn-sm" title="Notes" href={'#' + this.props.notebookId}>
          <i className="fa fa-plus-square fa-lg" aria-hidden="true" />&nbsp;Notes
        </a>&nbsp;&nbsp;&nbsp;
        <button className="btn btn-info btn-sm" type="button" data-toggle="modal" data-target={'#delete-' + this.props.notebookId}>
          <i className="fa fa-trash-o fa-lg" aria-hidden="true" />&nbsp;Delete
        </button>&nbsp;&nbsp;&nbsp;
        <div id={'edit-' + this.props.notebookId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form acceptCharset="utf-8" action="/notebooks/edit" method="post">
                  <input id="notebookId" name="notebookId" type="hidden" value={this.props.notebookId} />
                  <div className="form-group">
                    <input id="title" className="form-control" name="title" value="" placeholder="Name..." />
                  </div>
                  <div className="form-group">
                    <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id={'delete-' + this.props.notebookId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form acceptCharset="utf-8" action="/notebooks/delete" method="post">
                  <input id="notebookId" name="notebookId" type="hidden" value={this.props.notebookId} />
                  <p>Are you sure you want to delete the note '{this.props.notebookTitle}'</p>
                  <div className="form-group">
                    <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Confirm" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var NotebookEdit = React.createElement({
  render: function() {
    return (
      <div id={this.props.notebookId} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form acceptCharset="utf-8" action="/notebooks/edit" method="post">
                <input id="notebookId" name="notebookId" type="hidden" value={this.props.notebookId} />
                <div className="form-group">
                  <input id="title" className="form-control" name="title" value="" placeholder="Name..." />
                </div>
                <div className="form-group">
                  <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Notebook;