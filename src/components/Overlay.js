import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ text }) => (
  <div className="overlay" dangerouslySetInnerHTML={{ __html: text }} />
)

Overlay.propTypes = {
  text: PropTypes.string
}

export default Overlay
