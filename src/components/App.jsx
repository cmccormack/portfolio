/* eslint no-console: 'off' */

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const App = (props) => {
  console.log(props)
  console.log(props.children)
  console.log(PropTypes)


  return (
    <div>
      <h1>App</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      {props.children}
    </div>

  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}

// App.defaultProps = {
//   children: null,
// }

export default App
