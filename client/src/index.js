import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.css';
import LandingPage from './components/LandingPage';
import CreatePlan from './components/CreatePlan';
import JoinPlan from './components/JoinPlan';
import Lobby from './components/Lobby';
import Choices from './components/Choices';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/createplan' component={CreatePlan}/>
        <Route path='/joinplan' component={JoinPlan}/>
        <Route path='/lobby/:planCode/:name' component={Lobby}/>
        <Route path='/choices/:phase/:planCode/:name' component={Choices}/>
        <Route path='/choices/:phase/:parentID/:planCode/:name' component={Choices}/>
        <Route path='/:phase/:id/:planCode/:name' component={Choices}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);