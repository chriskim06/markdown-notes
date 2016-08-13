/**
 * @fileoverview Modal component for adding a notebook
 * @author Chris
 */

var React = require('react');

var AddNotebook = React.createClass({
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

module.exports = AddNotebook;