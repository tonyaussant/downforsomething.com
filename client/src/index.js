import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import Initiate from './components/Initiate';
import Join from './components/Join';
import Lobby from './components/Lobby';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/initiate' component={Initiate}/>
        <Route path='/join' component={Join}/>
        <Route path='/lobby' component={Lobby}/>
        <Route path='/phase1/' component={Phase1}/>
        <Route path='/phase1/:id' component={Phase1}/>
        <Route path='/phase2/:parentID' component={Phase2}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);