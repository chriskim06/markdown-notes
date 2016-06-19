/**
 * @fileoverview A component that represents a single note
 * @author Chris
 */

var React = require('react');

var NoteComponent = React.createClass({
  render: function() {
    return (
      <div>
        <form role="form" acceptCharset="utf-8" action={'/notes/delete/' + this.props.data.id} method="post">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">{'(' + this.props.data.edited + ') ' + this.props.data.title}</h3>
              <div className="btn-group pull-right">
                <div className="col-sm-8">
                  <input name="delete" type="submit" onClick="if (!confirm('Delete this note?')) return false" value="Delete" />
                </div>
              </div>
            </div>
            <div className="panel-body">
              <p className="noteCondensed">{this.props.data.summary}</p>
            </div>
            <div className="panel-footer clearfix">
              <a className="btn btn-default btn-sm" href={'/update/' + this.props.data.id}>Edit</a>
              <a className="btn btn-default btn-sm" href={'/preview/' + this.props.data.id}>View</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = NoteComponent;