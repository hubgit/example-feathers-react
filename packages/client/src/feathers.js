import feathers from 'feathers/client'
import io from 'socket.io-client';
import socketio from 'feathers-socketio/client'
// import rest from 'feathers-rest/client'
// import fetch from 'isomorphic-fetch'
import auth from 'feathers-authentication-client'
import hooks from 'feathers-hooks'
import reactive from 'feathers-reactive'
import RxJS from 'rxjs'

const server = 'http://localhost:3030'

export default feathers()
  .configure(hooks())
  // .configure(rest(server).fetch(fetch))
  .configure(socketio(io(server)))
  .configure(reactive(RxJS, { idField: '_id' }))
  .configure(auth({ storage: window.localStorage }))
