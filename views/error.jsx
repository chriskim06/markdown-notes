/**
 * @fileoverview Error page
 * @author Chris
 */

var React = require('react');
var DefaultLayout = require('./layouts/default');

var Error = React.createClass({
  printOutput: function() {
    if (this.props.err.length > 0) {
      return <pre>{this.props.err}</pre>;
    } else {
      return <p>{this.props.message}</p>;
    }
  },
  render: function() {
    return (
      <DefaultLayout>
        <div>
          <h1>Error: {this.props.statusCode}</h1>
          <br />
          {this.printOutput()}
        </div>
      </DefaultLayout>
    );
  }
});

module.exports = Error;
