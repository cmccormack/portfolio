/* eslint no-console: 'off' */
import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    console.log(window.$)
    window.$('.button-collapse').sideNav()
  }

  render() {
    const brand = this.props.brand
    const list = this.props.list
    return (
      <header>
        <nav className="row teal darken-2">
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#!" className={`brand-logo ${brand.position}`}>{brand.name}</a>
              <a
                className="right button-collapse"
                data-activates="header-side-nav"
                href="#!"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className={`${list.position} hide-on-med-and-down`}>
                {list.items.map(item => (
                  <li key={item.name}><a href={item.url}>{item.name}</a></li>
                ))}
              </ul>
              <ul id="header-side-nav" className="side-nav">
                {list.items.map(item => (
                  <li key={item.name}><a href={item.url}>{item.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
  }),
  list: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
    position: PropTypes.string,
  }),
}

Header.defaultProps = {
  brand: {
    name: 'Title',
    position: 'left',
  },
  list: {
    items: [
      {
        name: 'item1',
        url: '#',
      },
      {
        name: 'item2',
        url: '#',
      },
      {
        name: 'item3',
        url: '#',
      },
    ],
    position: 'right' },
}

export default Header
