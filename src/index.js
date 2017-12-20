import React from 'react';
import ReactDOM from 'react-dom';
import root from './reducers/root'
import _ from 'lodash'
import DevTools from 'mobx-react-devtools'

import TetrisGame from './components/TetrisGame'

ReactDOM.render(
  <div>
    {/* <TetrisGame /> */}
    <DevTools />
  </div>,
  document.getElementById('root')
)
