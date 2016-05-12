import React from 'react';
import { render } from 'react-dom';

import superagent from 'superagent';


//klasse erstellen
const CreateLearnPackagePage = React.createClass({
	getInitialState() {
		return {name: '', description:'' owner: "ruben"};
	},

	handleSubmit() {
		superagent.post('http://localhost:3030/learnpackage/')
			.auth('ruben', 'testest')
			.send({name : this.state.name, description : this.state.description, owner : this.state.owner})
			.end(function(err, res){
				if (err) alert(res.statusCode, err)
				if (res.statusCode == 200) {
					window.location = '/#/addContent/' + res.body._id
				}
   			})

	},

	handleNameChange: function(e) {
    this.setState({name: e.target.value});
	},
	handleDescriptionChange: function(e) {
	this.setState({description: e.target.value});
	},
	render() {
		return (
			<div>


				<h1>Neue Lerneinheit erstellen</h1>
				<p>Name der Lehreinheit</p>
		      	 <input
		          type="text"
		          placeholder="..."
		     	  onChange={this.handleNameChange} />
		     	  <h1></h1>
		     	  <p>Kurzbeschreibung der Lerneinheit</p>
		     	  <input
		          type="text"
		          placeholder="Beschreibung der Lerneinheit"
		     	  onChange={this.handleDescriptionChange} />
		     	  <h1></h1>
		        
		        <input onClick={this.handleSubmit} type="submit" value="Lerneinheit erstellen" />


	      	</div>

      	)
	}
})



module.exports = CreateLearnPackagePage;