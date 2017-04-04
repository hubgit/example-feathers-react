'use strict'

const glob = require('glob')
const path = require('path')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')

const handler = require('feathers-errors/handler')
const notFound = require('feathers-errors/not-found')

const authentication = require('./authentication')

const app = feathers()

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')))

// Enable CORS, security, compression, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set up plugins and providers
app.configure(hooks())
app.configure(rest())
app.configure(socketio())

app.configure(authentication)

// Set up our services
glob.sync('./services/*.js', { cwd: __dirname })
  .map(require)
  .forEach(app.configure.bind(app))

// Add global hooks
app.hooks(require('./hooks/global.js'))

// Configure middleware - always has to be last
app.use(notFound())
app.use(handler())

module.exports = app
