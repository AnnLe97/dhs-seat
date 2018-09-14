import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Login from './login'
import UserSignup from './signup'
import Room from './room'
import UserPage from './user'
import { CookiesProvider } from 'react-cookie'

class Router extends React.Component {
  render () {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <Login />} />
            <Route path='/signup' render={() => <UserSignup />} />
            <Route path='/room' render={() => <Room />} />
            <Route path='/user' render={()=> <UserPage />} />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    )
  }
}

export default Router
