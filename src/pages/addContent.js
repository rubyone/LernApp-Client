import React from 'react';
import { render } from 'react-dom';

//audio recorder
import AudioRecorder from 'react-audio-recorder';

//added webcam
import Webcam from 'react-webcam';

import superagent from 'superagent';



//klasse erstellen
const AddContentPage = React.createClass({
	handleSubmitAddContent() {
		superagent.post('http://localhost:3030/learnpackage/' + this.props.params.id)
			.auth('ruben', 'testest')
			.send({
				vocOne: this.state.vocOne,
				vocOneDesc: this.state.vocOneDesc,
				vocTwo: this.state.vocTwo,
				vocTwoDesc: this.state.vocTwoDesc
			})
			.end(function(err, res){
				if (err) alert(res.statusCode, err)
				if (res.statusCode == 200) {
					console.log(res.body)
					superagent.post('http://localhost:3030/learnpackage/' + this.props.params.id + '/imageForElement/' + res.body['_id'])
					.auth('ruben', 'testest')
					.set('Content-Type', 'application/octet-stream')
					.send(this.state.img)
					.end(function(err, res){
						alert('fertig')
					})
				}
		   	}.bind(this))
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
		var screenshot = this.refs.webcam.getScreenshot();
        this.setState({img: screenshot});
	},

	render() {
		return (
			<div>


			<h1>Neue Vokabel zu Lerneinheit hinzufügen</h1>
			<p>Vokabelname Muttersprache</p>
			<input
			type="text"
			placeholder="..."
			onChange={this.handleVocabelOneChange} />
			<p>Vokabelbeschreibung Muttersprache</p>
			<input
			type="text"
			placeholder="..."
			onChange={this.handleVocabelOneDescriptionChange} />
			<p>Vokabelname Fremdsprache</p>
			<input
			type="text"
			placeholder="..."
			onChange={this.handleVocabelTwoChange} />
			<p>Vokabelbeschreibung Fremdsprache</p>
			<input
			type="text"
			placeholder="..."
			onChange={this.handleVocabelTwoDescriptionChange} />
			<p></p>
			<input name="Datei" input
			type="file"
			placeholder="Datei"
			onChange={this.handleDataChange} />

			<p>Vokabelausprache Muttersprache</p>
			<AudioRecorder onChange={this.handleAudioChange}/>
			<p>Vokabelausprache Fremdsprache</p>
			<AudioRecorder onChange={this.handleAudioChange}/>
		     	    
		     	    
         
             <Webcam ref='webcam'/>

              	<input onClick={this.handleVideoChange} type="submit" value="screenshot" />
              	
		        <input onClick={this.handleSubmitAddContent} type="submit" value="Jetzt hinzufügen" />

	      	</div>


      	)
	}
})



module.exports = AddContentPage;