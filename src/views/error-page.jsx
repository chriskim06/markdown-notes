/**
 * @fileoverview Error page
 * @author Chris
 */

import React from 'react'
import DefaultLayout from './layouts/default'

class ErrorPage extends React.Component {
  printOutput() {
    if (this.props.err.length > 0) {
      return <pre>{this.props.err}</pre>
    } else {
      return <p>{this.props.message}</p>
    }
  }
  render() {
    return (
      <DefaultLayout>
        <div>
          <h1>Error: {this.props.statusCode}</h1>
          <br />
          {this.printOutput()}
        </div>
      </DefaultLayout>
    )
  }
}

export default ErrorPage
