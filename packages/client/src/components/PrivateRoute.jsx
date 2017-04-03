import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'

const PrivateRoute = ({ currentUser, component, ...rest }) => (
  <Route { ...rest } render={ props => {
    if (!currentUser) {
      return <Redirect to={{ pathname: '/signin', state: { from: rest.location } }}/>
    }

    // TODO: check permissions for this route?

    return React.createElement(component, props)
  }}/>
)

export default withRouter(connect(state => ({
  currentUser: state.currentUser
}))(PrivateRoute))
