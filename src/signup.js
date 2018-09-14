import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { InputGroup, Button, Intent, Tooltip } from '@blueprintjs/core'
import NavLink from 'react-router-dom/NavLink';
// import { userLogin, userSignup } from './rematch/models'

class UserSignup extends React.Component {
  handleFNChange (event) {
    console.log(event.target.value)
    this.props.firstnameChange(event.target.value)
  }

  handleIDChange (event) {
    console.log(event.target.value)
    this.props.usernameChange(event.target.value)
  }

  handleLNChange (event) {
    console.log(event.target.value)
    this.props.lastnameChange(event.target.value)
  }

  handlePWChange (event) {
    console.log(event.target.value)
    this.props.passwordChange(event.target.value)
  }

  handleLock (event) {
    event.preventDefault()
    console.log(this.props.userSignup)
    this.props.showPassword(1)
    this.props.showPasswordState === 0 ? this.props.showPassword(1) : this.props.showPassword(0)
  }

  handleSignup (event) {
    event.preventDefault()
    let newUser = {
      username: this.props.username,
      password: this.props.password,
      firstname: this.props.firstname,
      lastname: this.props.lastname
    }
    this.props.SignUp(newUser)
    window.alert('dang ky thanh cong')
  }

  render () {
    const lockButton = (
      <Tooltip content={`${this.props.showPasswordState === 1 ? 'Hide' : 'Show'} Password`} >
        <Button
          icon={this.props.showPasswordState === 0 ? 'unlock' : 'lock'}
          intent={Intent.WARNING}
          minimal
          onClick={this.handleLock.bind(this)}
        />
      </Tooltip>
    )

    return (
      <div>
        <form>
          <InputGroup
            onChange={this.handleIDChange.bind(this)}
            name='username-txt'
            placeholder='Enter your account'
          />
          <InputGroup
            onChange={this.handlePWChange.bind(this)}
            type={this.props.showPasswordState === 0 ? 'password' : 'text'}
            rightElement={lockButton}
            name='password-txt'
            placeholder='Enter your password...'
          />
          <InputGroup
            onChange={this.handleFNChange.bind(this)}
            name='firstname-txt'
            placeholder='Enter your First Name'
          />
          <InputGroup
            onChange={this.handleLNChange.bind(this)}
            name='lastname-txt'
            placeholder='Enter your Last Name'
          />
          <Button
            onClick={this.handleSignup.bind(this)}
          >Signup</Button>
          <NavLink to='/'><Button intent='danger'>Cancel</Button></NavLink>
        </form>
      </div>)
  }
}

function mapStateToProps (state) {
  console.log(state.userSignup)
  return state.userSignup
}

function mapDispatchToProps (dispatch) {
  console.log(dispatch.userSignup)
  return dispatch.userSignup
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup)
