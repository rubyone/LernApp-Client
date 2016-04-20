import React from 'react';
import { render } from 'react-dom';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');


const RegistrationPage = React.createClass({
	getInitialState() {
		return {email: '', age:'', password:''};
	},
	handleSubmit() {

		const socket = io('http://localhost:3030');
		const app = feathers()
  						.configure(hooks())
  						.configure(socketio(socket));

  		const userService = app.service('users');
  		userService.find({email: this.state.email}).then(function(users) {
  			console.log(users);
  		});
  		
  		console.log(this.state.email);

  		userService.create({email: this.state.email, age: this.state.age, password: this.state.password})
  					.then(function(result) {
  						console.log("Added:" +email);
  					});

  					userService.

	},
	handlePasswordChange: function(e) {
    	this.setState({password: e.target.value});
	},
	handleAgeChange: function(e) {
    	this.setState({age: e.target.value});
    	//console.log(this.state.age);
	},
	handleEmailChange: function(e) {
		this.setState({email: e.target.value});
		//console.log(email);
	},
	render() {
		return (
			<div>
				
		        <input
		          type="text"
		          placeholder="Email"
		     	  onChange={this.handleEmailChange} />

		        <input
		          type="number"
		          placeholder="Age"
		     	  onChange={this.handleAgeChange} />

		        <input
		          type="password"
		          placeholder="Password"
  		     	  onChange={this.handlePasswordChange} />

		        <input onClick={this.handleSubmit} type="submit" value="Register" />
	      	</div>
      	)
	}
})

module.exports = RegistrationPage;