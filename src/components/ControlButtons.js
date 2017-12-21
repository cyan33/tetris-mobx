import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'

import DirectionButton from './DirectionButton'

import { STOPPED, PAUSING } from '../constants/gameStatus'
import GameStatusButton from './GameStatusButton'

@inject('tetrisStore') @observer
class ControlButtons extends Component {
  _getPauseButtonProps() {
    const { isPlaying, gameStatus, onGamePause, onGameResume } = this.props.tetrisStore
    const hasStopped = gameStatus === STOPPED

    return {
      text: gameStatus === PAUSING ? 'resume' : 'pause',
      onClickHandler: isPlaying ? onGamePause : hasStopped ? () => {} : onGameResume
    }
  }

  _getStartButtonProps() {
    const { gameStatus, onGameStart } = this.props.tetrisStore
    return {
      text: gameStatus !== STOPPED ? 'Restart' : 'Start',
      onClickHandler: onGameStart 
    }
  }

  _getDirectionButtonProps(direction) {
    const { isPlaying, onHorizontalMove, onRotate, onEnableAccelerate, onDisableAccelerate } = this.props.tetrisStore
    
    if (!isPlaying) return { direction }

    switch(direction) {
      case 'left':
      case 'right':
        return {
          direction,
          onClickHandler: direction === 'left' ? onHorizontalMove.bind(this.props.tetrisStore, -1) 
            : onHorizontalMove.bind(this.props.tetrisStore, 1) 
        }
      case 'up':
        return {
          direction,
          onClickHandler: onRotate
        }
      case 'down':
        return {
          direction,
          onMouseDownHandler: onEnableAccelerate,
          onMouseUpHandler: onDisableAccelerate
        }
      default:
        return {}
    }
  }

  render() {
    return (
      <div className="control-buttons">
        <div className="start-game">
          <GameStatusButton {...this._getPauseButtonProps()} />
          <GameStatusButton {...this._getStartButtonProps()} />
        </div>
        <div className="directions-control">
          <DirectionButton {...this._getDirectionButtonProps('up')}/>
          <DirectionButton {...this._getDirectionButtonProps('left')}/>
          <DirectionButton {...this._getDirectionButtonProps('right')}/>
          <DirectionButton {...this._getDirectionButtonProps('down')}/>
        </div>
      </div>
    )
  }
}

ControlButtons.propTypes = {
  tetrisStore: PropTypes.object
}

export default ControlButtons
