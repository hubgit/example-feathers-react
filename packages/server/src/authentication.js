const authentication = require('feathers-authentication')
const local = require('feathers-authentication-local')
const jwt = require('feathers-authentication-jwt')

module.exports = function () {
  const app = this

  // TODO: store the secret in env
  app.configure(authentication({ secret: 'change-this-secret' }))
  app.configure(local())
  app.configure(jwt())

  // Add the authentication hook
  app.service('authentication').hooks({
    before: {
      create: authentication.hooks.authenticate(['local', 'jwt'])
    }
  })
}
