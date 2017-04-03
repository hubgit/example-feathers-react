import React from 'react'
import feathers from '../feathers'
import authenticate from '../authenticate'
import { Link, Redirect } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
import { FormsyText } from 'formsy-material-ui'
import { Form } from 'formsy-react'
import { connect } from 'react-redux'

const Signup = ({ currentUser, signUp, location }) => {
  if (currentUser) {
    const { state } = location
    return <Redirect to={ state && state.from ? state.from : '/articles' }/>
  }

  return (
    <Form onValidSubmit={signUp}>
      <FormsyText
        name="name"
        required
        autoFocus
        fullWidth={true}
        floatingLabelText="Name"/>

      <FormsyText
        name="email"
        type="email"
        required
        fullWidth={true}
        floatingLabelText="Email"
        validations="isEmail"
        validationError="This is not a valid email"/>

      <FormsyText
        name="password"
        type="password"
        required
        fullWidth={true}
        floatingLabelText="Password"/>

      <RaisedButton type="submit" label="Sign up"/>

      <Link to="/signin" style={{float: 'right'}}>or sign in with an existing account</Link>
    </Form>
  )
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    signUp: data => feathers.service('users').create(data).then(() => {
      const { email, password } = data
      authenticate(dispatch, { strategy: 'local', email, password })
    })
  })
)(Signup)
