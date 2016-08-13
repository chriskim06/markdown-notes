/**
 * @fileoverview Main page
 * @author Chris
 */

var React = require('react');
var DefaultLayout = require('./layouts/default');
var NotebookComponent = require('./notebook-component');
var AddNotebook = require('./add-notebook');

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

module.exports = Index;