import feathers from './feathers'

export default (dispatch, data) => {
  return feathers.authenticate(data)
    .then(response => feathers.passport.verifyJWT(response.accessToken))
    .then(payload => {
      if (!payload.userId) return

      feathers.service('users').get(payload.userId).subscribe(user => {
        dispatch({ type: 'SIGNED_IN', payload: user })
      })
    })
    .catch(() => {
      dispatch({ type: 'SIGNED_OUT' })
    })
}
