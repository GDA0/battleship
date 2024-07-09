// Import our custom CSS
import './index.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import UI from './views/ui'
import GameBoard from './models/game-board'
import Player from './models/player'
import Ship from './models/ship'
import createPlayers from './models/create-players'
import startGame from './models/start-game'

document.addEventListener('DOMContentLoaded', () => {
  UI.initialize()
  const { player, computer } = createPlayers()

  UI.renderBoards([player, computer])

  UI.startButton.addEventListener('click', () => {
    UI.showComputerBoard()
    startGame.initialize(player, computer)
  })
})
