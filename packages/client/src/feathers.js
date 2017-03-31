import feathers from 'feathers/client'
import io from 'socket.io-client';
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import reactive from 'feathers-reactive'
import RxJS from 'rxjs'

export default feathers()
  .configure(hooks())
  .configure(socketio(io('http://localhost:3030/')))
  .configure(reactive(RxJS, { idField: '_id', listStrategy: 'always' }))
