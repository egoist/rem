'use strict'

module.exports = win => {
  const {screen} = require('electron')
  const windowSize = win.getSize()
  const screenSize = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea
  const position = {
    x: Math.floor(screenSize.x + ((screenSize.width / 2) - (windowSize[0] / 2))),
    y: 130
  }
  win.setPosition(position.x, position.y)
}