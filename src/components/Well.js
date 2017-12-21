import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import marked from 'marked'

import WellGrid from './WellGrid'
import Tetromino from './Tetromino'
import Overlay from './Overlay'
import { COLORS, TETROMINOS } from '../constants/tetromino'
import { PLAYING } from '../constants/gameStatus'
import { GAME_INTRO } from '../constants/options'

import './styles/Well.css'

@inject('tetrisStore') @observer
class Well extends Component {
  _getTetrominoProps() {
    const { grid, currTetroGrid, currTetroPosition, currTetromino } = this.props.tetrisStore
    return {
      grid,
      color: COLORS[currTetromino],
      tetroGrid: currTetroGrid,
      tetroPosition: currTetroPosition
    }
  }

  render() {
    const { grid, currTetromino, gameStatus } = this.props.tetrisStore
    return (
      <div className="well-container">
        <WellGrid grid={ grid } />
        {
          currTetromino &&
            <Tetromino { ...this._getTetrominoProps() } />
        }
        {
          gameStatus !== PLAYING &&
            <Overlay text={marked(GAME_INTRO)} />
        }
      </div>
    )
  }
}

Well.propTypes = {
  currTetroGrid: PropTypes.array,
  currTetroPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  currTetromino: PropTypes.oneOf(TETROMINOS),
  gameStatus: PropTypes.string,
  grid: PropTypes.array
}

export default Well
