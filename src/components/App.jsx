/* eslint no-console: 'off' */

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

import Header from './layout/Header'

const layout = {
  header: {
    // brand: {
    //   name: 'Chris McCormack',
    //   position: 'left',
    // },
    // list: {
    //   items: [],
    //   position: 'right',
    // },
  },
  footer: {
    title: 'Footer',
    content: 'Stuff will go here later',
    links: [
      { name: 'Link 1', url: '#' },
    ],
    copyright: {
      text: '© 2017 Copyright Chris McCormack',
      link: { name: 'Home', url: 'https://mackville.net' },
    },

  },
}

const App = props => (
  <div>
    <Header {...layout.header} />
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    {props.children}
  </div>

)


App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
