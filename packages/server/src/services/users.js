const createService = require('feathers-mongoose')
const hooks = require('../hooks/users')
const mongoose = require('mongoose')

module.exports = function () {
  const app = this

  const serviceName = 'users'

  const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, set: data => data.toLowerCase() },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
  })

  app.use(serviceName, createService({
    name: serviceName,
    Model: mongoose.model('User', schema),
    paginate: app.get('paginate')
  }))

  const filters = function (data, connection, hook) { // eslint-disable-line no-unused-vars
    return data // TODO: pluck just a few data fields
  }

  app.service(serviceName).hooks(hooks).filter(filters)
}
