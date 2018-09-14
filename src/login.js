import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { InputGroup, Button, Intent, Tooltip, Callout } from '@blueprintjs/core'
import logo from './img/Group_102.png'
import UserSignup from './signup'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import { Redirect } from 'react-router'

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  handleLogin (event) {
    event.preventDefault()
    let user = {
      username: this.props.usernameInput,
      password: this.props.passwordInput
    }
    this.props.loginAuth(user)
    // if(this.props.failed != 1) {
    //   this.props.cookies.set('loginstate',1)
    //   this.props.cookies.set('username',this.props.usernameInput)
    // }
  }

  handleIDChange (event) {
    console.log(event.target.value)
    this.props.usernameChange(event.target.value)
  }

  handlePWChange (event) {
    console.log(event.target.value)
    this.props.passwordChange(event.target.value)
  }

  handleLogout (event) {
    event.preventDefault()
    this.props.cookies.remove('loginstate')
    this.props.logout()
  }

  handleLockClick (event) {
    event.preventDefault()
    this.props.showPasswordState === 0 ? this.props.showPassword(1) : this.props.showPassword(0)
  }

  handleSignup(event) {
    event.preventDefault()
    
  }

  render () {
    console.log(this.props.failed)
    const lockButton = (
      <Tooltip content={`${this.props.showPasswordState === 1 ? 'Hide' : 'Show'} Password`} >
        <Button
          icon={this.props.showPasswordState === 0 ? 'unlock' : 'lock'}
          intent={Intent.WARNING}
          minimal
          onClick={this.handleLockClick.bind(this)}
        />
      </Tooltip>
    )
    const callout= (
      <Callout icon='cross' intent='danger' style={{
        display: this.props.failed === 0 ? 'none' : 'block'
      }}>{this.props.error}</Callout>
    )

    console.log(callout)

    if (typeof this.props.cookies.get('loginstate')== 'undefined') {
      return (
        <div>
          <img src={logo} id='logo' />
          {callout}
          <form>
            <InputGroup
              onChange={this.handleIDChange.bind(this)}
              name='username'
              placeholder='Enter your account'
            />
            <InputGroup
              onChange={this.handlePWChange.bind(this)}
              type={this.props.showPasswordState === 0 ? 'password' : 'text'}
              rightElement={lockButton}
              name='password-txt'
              placeholder='Enter your password...'
            />
            <Button intent='success' className='' onClick={this.handleLogin.bind(this)}>Login</Button>
            <Button intent='primary' className='' onClick={this.handleSignup.bind(this)}>Signup</Button>
          </form>
          
        </div>)
    } else {
      return (this.props.cookies.get('username')=='admin' ? <Redirect to="/room"/> : <Redirect to="/user"/>)
    }
  }
}

function mapStateToProps (state) {
  console.log(state.userLogin)
  return state.userLogin
}

function mapDispatchToProps (dispatch) {
  console.log(dispatch.userLogin)
  return dispatch.userLogin
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Login))
