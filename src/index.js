/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var React = require('react');
var ReactDOM = require('react-dom');

const io = require('socket.io-client');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const authentication = require('feathers-authentication/client');
const socketio = require('feathers-socketio/client');

import { Router, Route, Link, browserHistory } from 'react-router';

//routen verlinkungen initialisiert
var HomePage = require('./pages/home.js');
var LoginPage = require('./pages/login.js');
var RegistrationPage = require('./pages/registration.js');
var QuizPage = require('./pages/quiz.js');
var CreateLearnPackagePage = require('./pages/createLearnPackage.js');
var ActiveLearnPackagesPage = require('./pages/activeLearnPackages.js');
var AddContentPage = require('./pages/addContent.js');

var $ = require('jquery-browserify');

// Establish a Socket.io connection
const socket = io('http://localhost:3030');
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  // Use localStorage to store our login token
  .configure(authentication({
    storage: window.localStorage
  }));


// routen eingebaut
app.authenticate().then(() => {
    ReactDOM.render(
      <Router history={browserHistory}>
        <Route path="/" component={HomePage}>
            <Route path="registration" component={RegistrationPage} />
            <Route path="login" component={LoginPage} />
            <Route path="quiz" component={QuizPage} />
            <Route path="createLearnPackage" component={CreateLearnPackagePage} />
            <Route path="activeLearnPackages" component={ActiveLearnPackagesPage} />
            <Route path="addContent" component={AddContentPage} />

        </Route>


      </Router>,
      document.getElementById('app-container'));

      //document.body
}).catch(error => {
    if(error.code === 401) {
    window.location.href = '/login.html'
    }

    console.error(error);
});
