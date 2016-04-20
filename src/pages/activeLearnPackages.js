import React from 'react';
import { render } from 'react-dom';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');

//klasse erstellen
const ActiveLearnPackagesPage = React.createClass({
	handleSubmitViewLearnPackage() {

		const socket = io('http://localhost:3030');
		const app = feathers()
  						.configure(hooks())
  						.configure(socketio(socket));

  		const learnpackagesService = app.service('learnpackages');
  		learnpackagesService.find({name: this.state.name}).then(function(learnpackages) {
  			console.log(learnpackages);
  		});
  		console.log(this.state.name);

	},
	handleNameChange: function(e) {
    this.setState({name: e.target.value});
	},
	handleDescriptionChange: function(e) {
	this.setState({text: e.target.value});
	},
	render() {
		return (
			<div>


				<h1>Erstelle hier eine neue Klasse</h1>
		      	 <input
		          type="text"
		          placeholder="Klassen Name"
		     	  onChange={this.handleNameChange} />
		     	  <input
		          type="text"
		          placeholder="Klassenbeschreibung"
		     	  onChange={this.handleDescriptionChange} />
		        
		        <input onClick={this.handleSubmitViewLearnPackage} type="submit" value="Aktive Lernpackete anzeigen" />


	      	</div>

      	)
	}
})



module.exports = ActiveLearnPackagesPage;