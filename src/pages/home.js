import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/registration">Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/createLearnPackage">CreateLearnPackage</Link></li>
          <li><Link to="/activeLearnPackages">ActiveLearnPackages</Link></li>
          <li><Link to="/addContent">AddContent</Link></li>

        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = App;
