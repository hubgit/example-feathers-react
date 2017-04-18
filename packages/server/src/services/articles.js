const hooks = require('../hooks/articles')
const createService = require('feathers-mongoose')
const mongoose = require('mongoose')

module.exports = function () {
  const app = this

  const serviceName = 'articles'

  const schema = new mongoose.Schema({
    title: String,
    created: { type: Date, default: Date.now }
  })

  app.use(serviceName, createService({
    name: serviceName,
    Model: mongoose.model('Article', schema),
    paginate: app.get('paginate')
  }))

  const filters = function (data, connection, hook) { // eslint-disable-line no-unused-vars
    return data // TODO: actual filters
  }

  app.service(serviceName).hooks(hooks).filter(filters)
}
