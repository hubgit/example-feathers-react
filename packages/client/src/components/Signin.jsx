import React from 'react'
import authenticate from '../authenticate'
import { Link, Redirect } from 'react-router-dom'
import { FormsyText } from 'formsy-material-ui'
import { Form } from 'formsy-react'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'

const Signin = ({ currentUser, signIn, location }) => {
  if (currentUser) {
    const { state } = location
    return <Redirect to={ state && state.from ? state.from : '/articles' }/>
  }

  return (
    <Form onValidSubmit={signIn}>
      <FormsyText
        name="email"
        type="email"
        required
        autoFocus
        fullWidth={true}
        floatingLabelText="Email"/>

      <FormsyText
        name="password"
        type="password"
        required
        fullWidth={true}
        floatingLabelText="Password"/>

      <RaisedButton type="submit" label="Sign in"/>

      <Link to="/signup" style={{ float: 'right' }}>or sign up with a new account</Link>
    </Form>
  )
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    signIn: data => authenticate(dispatch, { strategy: 'local', ...data })
  })
)(Signin)
