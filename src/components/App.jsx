/* eslint no-console: 'off' */

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from './layout/Header'
import Footer from './layout/Footer'

const App = (props) => {
  console.log('In App')
  // console.log(props)
  console.log(props.children)
  console.log(props)
  console.log(JSON.stringify(props.children))
  // console.log(PropTypes)


  return (
    <div>
      <Header />
      <ul>
        {props.children.props.children.map(item => (
          <li><Link to={item.props.path}>{item.props.path}</Link></li>
        ))}
      </ul>
      {props.children}
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  // match: PropTypes.element.isRequired,
}

export default App
