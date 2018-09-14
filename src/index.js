import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import store from './rematch/store'
import { Provider } from 'react-redux'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render(<Provider store={store}>
  <Router />
</Provider>, document.getElementById('root'))
