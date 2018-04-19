import { Matrix } from './matrix'
import { Event } from './event'
import { getHighScore, setHighScore } from './score_record'

class Game {
  constructor({ size } = { size: 4 }) {
    this._max = 2048
    this._size = size
    this._event = new Event()
    this.matrix = new Matrix(this._size, this._size)
    this.status = {
      score: 0,
      highScore: getHighScore() || 0,
      max: 2,
    }

    this._setRandomBlock(2)
    this._setRandomBlock(2)
  }

  move(direction) {
    let max = 0

    switch (direction) {
      case 'down': {
        this.matrix.turn('right')
        this._updateGameboard()
        this.matrix.turn('left')
        break
      }
      case 'up': {
        this.matrix.turn('left')
        this._updateGameboard()
        this.matrix.turn('right')
        break
      }
      case 'left': {
        this._updateGameboard()
        break
      }
      case 'right': {
        this.matrix.turn('back')
        this._updateGameboard()
        this.matrix.turn('back')
        break
      }
      default:
      throw new Error('Error direction')
    }

    this._updateGameStatus()

    const randomNumber = Math.random() > .7 ? 4 : 2
    this._setRandomBlock(randomNumber)
  }

  addWinEvent(func) {
    this._event.addEvent('win', func)
  }

  addDefeatEvent(func) {
    this._event.addEvent('defeat', func)
  }

  _updateGameboard() {
    this._zip()
    this._calculate()
    this._zip()
  }

  _updateGameStatus() {
    if (this.status.max >= this._max) {
      this.status.win = true
    }
  }

  _zip() {
    const tempArr = []
    const newArr = []

    for (let i = 0; i < this._size; i++) {
      tempArr[i] = []
    }
    for (let i = 0; i < this._size; i++) {
      newArr[i] = new Array(this._size).fill(0)
    }

    this.matrix.array.forEach((row, i) => {
      row.forEach((num, j) => {
        if (num !== 0) {
          tempArr[i].push(num)
        }
      })
    })
    tempArr.forEach((row, i) => {
      row.forEach((num, j) => {
        newArr[i][j] = num
      })
    })

    this.matrix.array = newArr
  }

  _calculate() {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (j < this._size - 1 && this.matrix.array[i][j] === this.matrix.array[i][j + 1]) {
          const score = this.matrix.array[i][j] * 2

          // update game score
          this._setScore(score)

          this.matrix.set(i, j, score)
          this.matrix.clear(i, j + 1)
        }

        // get max
        const num = this.matrix.array[i][j]

        if (num > this.status.max) this.status.max = num
      }
    }

    if (this.status.max === 2048) this._gameover('win')
  }

  _setScore(score) {
    this.status.score += score

    if (this.status.score > this.status.highScore) {
      this.status.highScore = this.status.score
      setHighScore(this.status.score)
    }
  }

  _setRandomBlock(num) {
    const emptyRow = this._getRandomEmptyRow()

    if (emptyRow) {
      this._setEmptyBlock(emptyRow, num, this._getRandomNumber())
    } else {
      this._gameover('defeat')
    }
  }

  _gameover(status) {
    this._event.emit(status)
  }

  _haveEmptyBlock() {
    return this.matrix.array.some(innerArr => {
      return innerArr.some(item => item === 0)
    })
  }

  _getRandomEmptyRow() {
    if (!this._haveEmptyBlock()) return

    return this._getEmptyRow(this._getRandomNumber())
  }

  _getEmptyRow(rowNumber) {
    const row = this.matrix.array[rowNumber]

    if (row.some(item => item === 0)) {
      return row
    } else {
      return this._getEmptyRow((rowNumber + 1) % this._size)
    }
  }

  _setEmptyBlock(row, num, index) {
    if (row[index] === 0) {
      row[index] = num
    } else {
      row.some((rowNum, i) => {
        if (rowNum === 0) {
          row[i] = num
          return true
        }
        return false
      })
    }
  }

  _getRandomNumber() {
    return Math.floor(Math.random() * this._size)
  }
}

export {
  Game,
}
