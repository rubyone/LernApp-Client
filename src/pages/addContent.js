import React from 'react';
import { render } from 'react-dom';

//audio recorder
import AudioRecorder from 'react-audio-recorder';

//added webcam
import Webcam from 'react-webcam';



const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');

//klasse erstellen
const AddContentPage = React.createClass({
	handleSubmitAddContent() {

		const socket = io('http://localhost:3030');
		const app = feathers().configure(hooks()).configure(socketio(socket));

  		const learnpackagesService = app.service('learnpackages');
  		learnpackagesService.find({name: this.state.name}).then(function(learnpackages) {
  			
  		});
  		console.log(this.state.name);

  		learnpackagesService.create({email: this.state.email, age: this.state.age, password: this.state.password})
  					.then(function(result) {
  						//console.log("Added:" +email);
  					});

	},
	handleVocabelOneChange: function(e) {
    this.setState({vocOne: e.target.value});
	},
	handleVocabelOneDescriptionChange: function(e) {
	this.setState({vocOneDesc: e.target.value});
	},
	handleVocabelTwoChange: function(e) {
	this.setState({vocTwo: e.target.value});
	},
	handleVocabelTwoDescriptionChange: function(e) {
	this.setState({vocTwoDesc: e.target.value});
	},
	handleDataChange: function(e) {
	this.setState({data: e.target.value});
	},
	handleAudioChange: function(e) {
	this.setState({data: e.target.value});
	},
	handleVideoChange: function(e) {
	this.setState({data: e.target.value});
	},

	render() {
		return (
			<div>


				<h1>Erstelle hier neuen Kontent für deine Klasse</h1>

		      	 <input
		          type="text"
		          placeholder="Vokabel 1"
		     	  onChange={this.handleVocabelOneChange} />

		     	  <input
		          type="text"
		          placeholder="Beschreibung Vokabel 1"
		     	  onChange={this.handleVocabelOneDescriptionChange} />

		     	  <input
		          type="text"
		          placeholder="Vokabel 2"
		     	  onChange={this.handleVocabelTwoChange} />

		     	  <input
		          type="text"
		          placeholder="Beschreibung Vokabel 2"
		     	  onChange={this.handleVocabelTwoDescriptionChange} />
		     	 
		     	  <input name="Datei" input
		          type="file"
		          placeholder="Datei"
		     	  onChange={this.handleDataChange} />
		     	 
		     	  <AudioRecorder onChange={this.handleAudioChange}/>
		     	    
		     	    
         
             <Webcam
              ref='webcam'/>
              
		        <input onClick={this.handleSubmitAddContent} type="submit" value="Aktive Lernpackete anzeigen" />

	      	</div>



      	)
	}
})



module.exports = AddContentPage;