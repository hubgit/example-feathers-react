import feathers from './feathers'

export default (dispatch, data = {}) => {
  return feathers.authenticate(data)
    .then(response => feathers.passport.verifyJWT(response.accessToken))
    .then(payload => {
      if (!payload.userId) return

      const query = feathers.service('users').get(payload.userId)

      query.subscribe(user => {
        feathers.set('user', user)
        dispatch({ type: 'SIGNED_IN', payload: user })
      })

      return query
    })
    .catch(err => {
      feathers.set('user', null)
      dispatch({ type: 'SIGNED_OUT' })
    })
}
