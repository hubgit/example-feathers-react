import React from 'react'
import feathers from '../feathers'
import { List, ListItem } from 'material-ui'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import './Nav.css'

const Nav = ({ currentUser, signOut }) => {
  if (!currentUser) {
    return (
      <List>
        <ListItem
          primaryText="Sign in"
          containerElement={<NavLink to="/signin"/>}/>
      </List>
    )
  }

  return (
    <List>
      <ListItem
        primaryText="Articles"
        containerElement={<NavLink to="/articles"/>}/>
      <ListItem
        primaryText={currentUser.name}
        secondaryText="Sign out"
        onTouchTap={signOut}/>
    </List>
  )
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    signOut: () => {
      feathers.logout().then(() => {
        dispatch({ type: 'SIGNED_OUT' })
      })
    }
  })
)(Nav)
