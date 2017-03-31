import React from 'react';
import ReactDOM from 'react-dom';
import Articles from './Articles';
import './index.css';

import { MuiThemeProvider } from 'material-ui'

// workaround - remove once material-ui is updated
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import 'typeface-roboto'

ReactDOM.render(
  <MuiThemeProvider>
    <Articles />
  </MuiThemeProvider>,
  document.getElementById('root')
);
