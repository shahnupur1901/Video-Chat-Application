/*
App.js contains the 3 major components of the app, i.e, the Welcome, Create a meeting, Join a Meeting web pages which can be browed with the help of react-router-dom.
The context provider is used for accessing the information and deals with interacting with the server.
*/

import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import CreateMeeting from "/home/nupur/VideoCall/webappFrontEnd/src/CreateMeeting.js"
import JoinMeeting from "/home/nupur/VideoCall/webappFrontEnd/src/JoinMeeting.js"
import Welcome from "/home/nupur/VideoCall/webappFrontEnd/src/Welcome.js"
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
function App() {
  return (
     
      <Router>
      <Switch>
      <Route path="/" exact component={Welcome} />
      <ContextProvider>
        <Route path="/CreateMeeting" exact component={CreateMeeting} />
        <Route path="/JoinMeeting" exact component={JoinMeeting} />
        </ContextProvider>
      </Switch>
    </Router>
 
      )
}

export default App;
