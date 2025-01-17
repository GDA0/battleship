import GameBoard from '../src/models/game-board'
import Ship from '../src/models/ship'

test('GameBoard can place ships at specific coordinates', () => {
  const board = new GameBoard()
  const ship = new Ship(3)
  board.placeShip(ship, 0, 0, 'horizontal')
  expect(board.board[0][0]).toBe(ship)
  expect(board.board[0][1]).toBe(ship)
  expect(board.board[0][2]).toBe(ship)
})

test('GameBoard can receive attacks and register hits', () => {
  const board = new GameBoard()
  const ship = new Ship(3)
  board.placeShip(ship, 0, 0, 'horizontal')
  board.receiveAttack(0, 0)
  expect(ship.hits).toBe(1)
})

test('GameBoard can receive attacks and register misses', () => {
  const board = new GameBoard()
  board.receiveAttack(0, 0)
  expect(board.missedAttacks).toContainEqual([0, 0])
})

test('GameBoard can report whether all ships are sunk', () => {
  const board = new GameBoard()
  const ship = new Ship(3)
  board.placeShip(ship, 0, 0, 'horizontal')
  board.receiveAttack(0, 0)
  board.receiveAttack(0, 1)
  board.receiveAttack(0, 2)
  expect(board.areAllShipsSunk()).toBe(true)
})
