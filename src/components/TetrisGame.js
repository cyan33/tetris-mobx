import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import DevTools from 'mobx-react-devtools'

import Well from './Well'
import InfoPanel from './InfoPanel'

import { PLAYING } from '../constants/gameStatus'
import { TETROMINOS } from '../constants/tetromino'
import { UP, LEFT, RIGHT, DOWN } from '../constants/options' 

import './styles/TetrisGame.css'

// export common class component for test
@inject('tetrisStore') @observer
class TetrisGame extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this._onkeydown)
    window.addEventListener('keyup', this._onkeyup)

    const { onGameInit } = this.props.tetrisStore
    onGameInit()
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._onkeydown)
    window.removeEventListener('keyup', this._onkeyup)
  }

  _onkeydown = (e) => {
    e.preventDefault()
    
    const {
      onHorizontalMove,
      onRotate,
      onEnableAccelerate,
      isPlaying,
      isAccelerating
    } = this.props.tetrisStore

    if(!isPlaying) return

    switch(e.keyCode) {
      case UP:
        onRotate()
        break
      case LEFT:
        onHorizontalMove(-1)
        break
      case RIGHT:
        onHorizontalMove(1)
        break
      case DOWN:
        if (isAccelerating) return
        onEnableAccelerate()
        break
      default:
        return
    }
  }

  _onkeyup = (e) => {
    const { isPlaying, onDisableAccelerate } = this.props.tetrisStore
    if (!isPlaying) return

    if (e.keyCode === DOWN) {
      onDisableAccelerate()
    }
  }

  _getInfoPanelProps() {
    const { score, linesCleared, nextTetromino, gameStatus } = this.props.tetrisStore
    return {
      score,
      linesCleared,
      nextTetromino,
      gameStatus
    }
  }
  
  render() {
    return (
      <div className="tetris-container">
        <Well />
        <InfoPanel {...this._getInfoPanelProps()} />
        <DevTools />  {/* should ignore DevTools in production */}
      </div>
    )
  }
}

TetrisGame.propTypes = {

}

export default TetrisGame
