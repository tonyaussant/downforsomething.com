import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import CreatePlan from './components/CreatePlan';
import JoinPlan from './components/JoinPlan';
import Lobby from './components/Lobby';
import Phases from './components/Phases';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/createplan' component={CreatePlan}/>
        <Route path='/joinplan' component={JoinPlan}/>
        <Route path='/lobby/:user/:planCode/:name' component={Lobby}/>
        <Route path='/phase1/:user/:planCode/:name/' component={Phases}/>
        <Route path='/phase2/:parentID/:user/:planCode/:name/' component={Phases}/>
        <Route path='/results/:parentID/:user/:planCode/:name' component={Phases}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);