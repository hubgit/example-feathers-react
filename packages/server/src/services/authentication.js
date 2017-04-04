const authentication = require('feathers-authentication')
const local = require('feathers-authentication-local')
const jwt = require('feathers-authentication-jwt')
const hooks = require('../hooks/authentication')

module.exports = function () {
  const app = this

  const serviceName = 'authentication'

  app.configure(authentication(app.get('auth')))
  app.configure(local())
  app.configure(jwt())

  // Add the authentication hook
  app.service(serviceName).hooks(hooks)
}
