const NeDB = require('nedb')
const path = require('path')
const createService = require('feathers-nedb')
const hooks = require('../hooks/users')

module.exports = function () {
  const app = this

  const serviceName = 'users'

  app.use(serviceName, createService({
    name: serviceName,
    Model: new NeDB({
      filename: path.join(app.get('nedb'), 'users.db'),
      autoload: true
    }),
    paginate: app.get('paginate')
  }))

  const filters = function (data, connection, hook) { // eslint-disable-line no-unused-vars
    return data // TODO: actual filters
  }

  app.service(serviceName).hooks(hooks).filter(filters)
}
