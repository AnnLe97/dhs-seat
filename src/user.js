import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { InputGroup, Button, Intent, Tooltip, Classes, Dialog } from '@blueprintjs/core'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import RoomView from './RoomView'
import { Redirect } from 'react-router'

class UserPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: 1
    }
  }

  handleLogout (event) {
    event.preventDefault()
    this.setState({
      loggedIn: 0
    })
    this.props.cookies.remove('loginstate')
    this.props.cookies.remove('username')
  }

  render () {
    return (
      this.state.loggedIn == 0 ? <Redirect to='/' /> : typeof this.props.cookies.get('loginstate') === 'undefined' ? <Redirect to='/' />
      : <div><p>Welcome {this.props.cookies.get('username')}</p>
          <Button intent='danger' onClick={this.handleLogout.bind(this)}>Logout</Button></div>
    )
  }
}

export default withCookies(UserPage)
