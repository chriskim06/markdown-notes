/**
 * @fileoverview Main page
 * @author Chris
 */

var React = require('react');
var DefaultLayout = require('./layouts/default');
var NotebookComponent = require('./notebook-component');

var Index = React.createClass({
  render: function() {
    var content = this.props.notebookNames.map(function(notebook) {
      return <NotebookComponent key={notebook.id} data={notebook} />
    });
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
    );
  }
});

var AddNotebook = React.createClass({
  // Implement the handleSubmit method on this to deal with state
  render: function() {
    return (
      <div id="addNotebook" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form acceptCharset="utf-8" action="/notebooks/create" method="post">
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

module.exports = Index;