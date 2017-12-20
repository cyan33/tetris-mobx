import React from 'react';
import ReactDOM from 'react-dom';
import { Well } from '../components/Well';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Well />, div);
});
