/**
 * @fileoverview A component for creating a note
 * @author Chris
 */

var React = require('react');
var DefaultLayout = require('./layouts/default');

var CreateComponent = React.createClass({
  setValue: function() {
    var simplemde = new SimpleMDE({
      element: document.getElementById('noteArea'),
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "|", "preview", "|", "guide"
      ],
      spellChecker: false
    });
    document.getElementById('note').value = simplemde.value();
  },
  render: function() {
    return (
      <DefaultLayout>
        <h1>{this.props.title}</h1>
        <br />
        <form className="form-horizontal" role="form" acceptCharset="utf-8" action="/create" method="post">
          <textarea id="note" name="note" style="display: none;" />
          <div className="form-group">
            <div className="markdown editor">
              <input id="title" className="form-control" name="title" value="" placeholder="Title..." />
            </div>
          </div>
          <div className="form-group">
            <div className="markdown editor">
              <textarea id="noteArea" className="form-control" name="noteArea" style="display: none;" />
            </div>
          </div>
          <div className="form-group">
            <div className="markdown editor">
              <input id="submit" className="btn btn-primary" name="submit" type="submit" value="Save" onClick={this.setValue} />
            </div>
          </div>
        </form>
      </DefaultLayout>
    );
  }
});

module.exports = CreateComponent;
