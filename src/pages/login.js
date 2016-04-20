import React from 'react';
import { render } from 'react-dom';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');


const LoginPage = React.createClass({
	handleSubmit() {

		const socket = io('http://localhost:3030');
		const app = feathers()
  						.configure(hooks())
  						.configure(socketio(socket));

  		const userService = app.service('users');
  		userService.find({email: this.state.email}).then(function(users) {
  			console.log(users);
  		});
}
	,
	handlePasswordChange: function(e) {
    this.setState({email: e.target.value});
	},
	handleEmailChange: function(e) {
	this.setState({text: e.target.value});
	},
	render() {
		return (
			<div>
		        <input
		          type="text"
		          placeholder="Email"
		          onChange={this.handleEmailChange} />
		          
		        <input
		          type="password"
		          placeholder="Password"
		          onChange={this.handlePasswordChange} />

		        <input onClick={this.handleSubmit} type="submit" value="Post" />
	      	</div>
      	)
	}
})

module.exports = LoginPage;