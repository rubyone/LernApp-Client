import React from 'react';
import { render } from 'react-dom';

import superagent from 'superagent';


//klasse erstellen
const LearnpreferencePage = React.createClass({
	getInitialState() {
		return {name: '', description:''};
	},

	handleSubmit() {
		superagent.post('http://localhost:3030/learnpackage/')
			.auth('ruben', 'testest')
			.send({name : this.state.name, description : this.state.description})
			.end(function(err, res){
				if (err) alert(res.statusCode, err)
				if (res.statusCode == 200) {
					// window.location = '/#/quiz/' + res.body._id
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


				<h1>Erstelle hier eine neue Klasse</h1>
		      	 <ul>

          		// <li><Link to="/learnpreference/quiz">Guiz</Link></li>
         


        </ul>
        {this.props.children}
		        
		        <input onClick={this.handleSubmit} type="submit" value="Weiter zum Quiz" />


	      	</div>

      	)
	}
})



module.exports = LearnpreferencePage;