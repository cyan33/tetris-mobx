import _ from 'lodash'
import { PAUSING } from '../constants/gameStatus'

export function getTetrisStateFromStorage() {
  if (localStorage.getItem('tetrisState')) {
    return _.assign({}, JSON.parse(localStorage.getItem('tetrisState')), { gameStatus: PAUSING })
  }
}

export function updateTetrisStateStorage(s) {
  if (s === null) {
    localStorage.removeItem('tetrisState')
    return
  }
  const state = _.pick(this, [
    'gameStatus',
    'isAccelerating',
    'dropInterval',
    'grid',
    'currTetroGrid',
    'currTetroPosition',
    'currTetromino',
    'score',
    'linesCleared',
    'nextTetromino'
  ]);
  localStorage.setItem('tetrisState', JSON.stringify(state))
  return
}
