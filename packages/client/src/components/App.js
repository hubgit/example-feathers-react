import React from 'react'
import Nav from './Nav'
import Articles from './Articles';
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import Signin from './Signin'
import { Route } from 'react-router-dom'

const styles = {
  app: {
    fontFamily: 'Roboto, sans-serif'
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: 200,
    borderRight: '1px solid #ddd'
  },
  main: {
    minHeight: 400,
    marginLeft: 200
  }
}

const App = () => {
  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <Nav/>
      </div>

      <div style={styles.main}>
        <PrivateRoute path="/articles" exact component={Articles}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/signin" exact component={Signin}/>
      </div>
    </div>
  )
}

export default App
