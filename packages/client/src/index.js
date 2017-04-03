import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui'
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

// store
import store from './store';

// authentication
import authenticate from './authenticate';

// styles
import 'typeface-roboto';

// components
import App from './components/App'

// workaround - remove once material-ui is updated
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// render
authenticate(store.dispatch).then(() => {
  ReactDOM.render(
    <MuiThemeProvider>
      <StoreProvider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </StoreProvider>
    </MuiThemeProvider>,
    document.getElementById('root')
  )
})
