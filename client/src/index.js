import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import Initiate from './components/Initiate';
import Join from './components/Join';
import Lobby from './components/Lobby';
import Choices from './components/Choices';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/initiate' component={Initiate}/>
        <Route path='/join' component={Join}/>
        <Route path='/lobby/:roomCode/:displayName' component={Lobby}/>
        <Route path='/choices/:phase/:roomCode/:displayName' component={Choices}/>
        <Route path='/choices/:phase/:parentID/:roomCode/:displayName' component={Choices}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);