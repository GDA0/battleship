import UI from '../views/ui'

export default class StartGame {
  static currentPlayer
  static player
  static computer

  // Initialize random starter
  static initialize (player, computer) {
    this.player = player
    this.computer = computer
    this.currentPlayer = Math.random() > 0.5 ? 'player' : 'computer'

    if (this.currentPlayer === 'player') {
      UI.updateNotification('The game started, your turn.')
    } else {
      UI.updateNotification("The game started, computer's turn.")
      setTimeout(
        () => this.handleComputerAttack(this.player, this.computer),
        this.getDelayTime()
      )
    }

    UI.computerBoard.addEventListener(
      'click',
      this.handlePlayerAttack.bind(this)
    )
  }

  static getDelayTime () {
    // Min is 500ms Max is 3000ms
    return Math.random() * 2500 + 500
  }

  static handleComputerAttack (player, computer) {
    let x, y
    let cell
    do {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
      cell = document.querySelector(
        `.player .game-board .cell[data-row="${x + 1}"][data-col="${y + 1}"]`
      )
    } while (cell.classList.contains('attacked'))

    const hit = computer.attack(player, x, y)
    UI.fillCell(cell, hit)
    if (player.gameBoard.areAllShipsSunk()) {
      UI.updateNotification('You lose!')
    } else {
      this.currentPlayer = 'player'
      UI.updateNotification('Your turn.')
    }
  }

  static handlePlayerAttack (event) {
    if (this.currentPlayer === 'player') {
      const cell = event.target
      if (
        cell.classList.contains('cell') &&
        !cell.classList.contains('attacked')
      ) {
        const x = parseInt(cell.dataset.row, 10) - 1
        const y = parseInt(cell.dataset.col, 10) - 1
        const hit = this.player.attack(this.computer, x, y)
        UI.fillCell(cell, hit)
        if (this.computer.gameBoard.areAllShipsSunk()) {
          UI.updateNotification('You won!')
          UI.computerBoard.removeEventListener(
            'click',
            this.handlePlayerAttack.bind(this)
          )
        } else {
          this.currentPlayer = 'computer'
          UI.updateNotification("Computer's turn, please wait.")
          setTimeout(
            () => this.handleComputerAttack(this.player, this.computer),
            this.getDelayTime()
          )
        }
      }
    }
  }
}
