import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route,  HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import home from './pages/home';
import Registration from './pages/registration';
import reset from './pages/reset';

const routing = (
    <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={home} />
      <Route path="/registration" component={Registration} />
      <Route path="/reset" component={reset} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
