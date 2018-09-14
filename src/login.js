import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { InputGroup, Button, Intent, Tooltip, Callout } from '@blueprintjs/core'
import logo from './img/Group_102.png'
import UserSignup from './signup'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

class Login extends React.Component {
  handleLogin (event) {
    event.preventDefault()
    let user = {
      username: this.props.usernameInput,
      password: this.props.passwordInput
    }
    this.props.loginAuth(user)
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
    this.props.logout()
  }

  handleLockClick (event) {
    event.preventDefault()
    this.props.showPasswordState === 0 ? this.props.showPassword(1) : this.props.showPassword(0)
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

    if (this.props.loginState === 0) {
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
            <NavLink to='/signup'><Button intent='primary' className=''>
            Signup</Button></NavLink>
          </form>
          
        </div>)
    } else {
      return (<div>
        <p>Logined as {this.props.username}</p>
        <Button intent='danger' onClick={this.handleLogout.bind(this)}>Logout</Button>
      </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
