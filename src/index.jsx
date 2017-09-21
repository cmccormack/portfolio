/* eslint no-console: 'off' */

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App'

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path={'/about'} component={() => <h1>About</h1>} />
        <Route exact path={'/portfolio'} component={() => <h1>Portfolio</h1>} />
        <Route exact path={'/services'} component={() => <h1>Services</h1>} />
        <Route exact path={'/blog'} component={() => <h1>Blog</h1>} />
        <Route exact path={'/contact'} component={() => <h1>Contact</h1>} />
        <Route exact path={'/'} component={() => <h1>Home</h1>} />
        <Route path="*" component={({ match }) => <h1>{`${match.url} not found.`}</h1>} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root'),
)
