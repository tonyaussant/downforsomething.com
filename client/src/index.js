import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Lobby from './components/Lobby';
import Choices from './components/Choices';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/createroom' component={CreateRoom}/>
        <Route path='/joinroom' component={JoinRoom}/>
        <Route path='/lobby/:roomCode/:displayName' component={Lobby}/>
        <Route path='/choices/:phase/:roomCode/:displayName' component={Choices}/>
        <Route path='/choices/:phase/:parentID/:roomCode/:displayName' component={Choices}/>
        <Route path='/:phase/:id/:roomCode/:displayName' component={Choices}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);