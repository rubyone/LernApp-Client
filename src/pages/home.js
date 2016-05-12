import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Vokabel-LernApp</h1>
        <ul>
          <li><Link to="/registration">registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/learnpreference">Lernpräferenzanpassung</Link></li>
          <li><Link to="/createLearnPackage">Lerneinheit erstellen</Link></li>
          
         
          <li><Link to="/quiz">Memory</Link></li>


        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = App;