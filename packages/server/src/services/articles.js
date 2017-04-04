const NeDB = require('nedb')
const path = require('path')
const hooks = require('../hooks/articles')
const createService = require('feathers-nedb')

module.exports = function () {
  const app = this

  const serviceName = 'articles'

  app.use(serviceName, createService({
    name: serviceName,
    Model: new NeDB({
      filename: path.join(app.get('nedb'), 'articles.db'),
      autoload: true
    }),
    paginate: app.get('paginate')
  }))

  const filters = function (data, connection, hook) { // eslint-disable-line no-unused-vars
    return data // TODO: actual filters
  }

  app.service(serviceName).hooks(hooks).filter(filters)
}
