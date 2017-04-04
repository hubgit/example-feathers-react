const authentication = require('feathers-authentication')
const local = require('feathers-authentication-local')
const jwt = require('feathers-authentication-jwt')

module.exports = function () {
  const app = this

  // TODO: store the secret in env
  // NOTE: this creates the 'authentication' service
  app.configure(authentication({ secret: 'change-this-secret' }))
  app.configure(local())
  app.configure(jwt())

  // Add the authentication hook
  // See https://github.com/feathersjs/feathers-authentication-local/issues/4 for why this is needed
  app.service('authentication').hooks({
    before: {
      create: authentication.hooks.authenticate(['local', 'jwt'])
    }
  })
}
