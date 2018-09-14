import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Login from './login'
import UserSignup from './signup'
import Room from './room'

class Router extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Login />} />
          <Route path='/signup' render={() => <UserSignup />} />
          <Route path='/room' render={() => <Room />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
