import React from 'react';
import ReactDOM from 'react-dom';
import Articles from './Articles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Articles />, div);
});
