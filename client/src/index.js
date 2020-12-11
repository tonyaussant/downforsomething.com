import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import Initiate from './components/Initiate';
import Join from './components/Join';
import WaitingRoom from './components/WaitingRoom';
import Choices from './components/Choices';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/initiate' component={Initiate}/>
        <Route path='/join' component={Join}/>
        <Route path='/waitingroom/:phase' component={WaitingRoom}/>
        <Route path='/choices/:phase' component={Choices}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);