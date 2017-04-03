'use strict';

const auth = require('feathers-authentication');
const hooks = require('feathers-hooks-common');
const local = require('feathers-authentication-local');

// TODO: rate limiting

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate(['jwt'])
    ],
    get: [
      auth.hooks.authenticate(['jwt'])
    ],
    create: [
      local.hooks.hashPassword('password')
    ],
    update: [
      auth.hooks.authenticate(['jwt'])
    ],
    patch: [
      auth.hooks.authenticate(['jwt'])
    ],
    remove: [
      auth.hooks.authenticate(['jwt'])
    ]
  },

  after: {
    all: [
      hooks.remove('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
