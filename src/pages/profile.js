import React from 'react';
import { render } from 'react-dom';

import superagent from 'superagent';



const ProfilPage = React.createClass({
	getInitialState() {
		return {name: ''};
	},

		handleSubmit() {
		superagent.post('http://localhost:3030/user/' + this.props.params.id)
			.auth('ruben', 'testest')
			.accept('json')
			.get('http://localhost:3030/user/5728b128114855de165d597f' + this.props.params.username)
			console.log( this.props.params)
	},


		render() {
			return (
				<div>
			        <input  type="submit" value="Display Profile" onClick={this.handleSubmit}/>

			         <ul>
    				  <li>bei Anette vorbeischauen</li>
    				  <li>bei Bert vorbeischauen</li>
    				  <li>bei Christine vorbeischauen</li>
    				  <li>bei Dieter vorbeischauen</li>
    				</ul>

		      	</div>	
	  			  	)
		}
	})

module.exports = ProfilPage;