import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'

import TetrisGame from './components/TetrisGame'
import TetrisStore from './stores/TetrisStore'

const t = new TetrisStore()

window.t = t

ReactDOM.render(
  <Provider tetrisStore={t}>
    <TetrisGame />
  </Provider>,
  document.getElementById('root')
)
