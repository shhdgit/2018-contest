import { Matrix } from './matrix'

class Game {
  constructor({ size } = { size: 4 }) {
    this._max = 2048
    this._size = size

    this.restart()
  }

  // init game
  restart() {
    this.matrix = new Matrix(this._size, this._size)
    this.status = {
      win: false,
      score: 0,
    }

    this.setRandomBlock(2)
    this.setRandomBlock(2)
  }

  move(direction) {
    let max = 0

    switch (direction) {
      case 'bottom': {
        this.matrix.turn('right')
        this.zip()
        max = this.calculate()
        this.zip()
        this.matrix.turn('left')
        break
      }
      case 'top': {
        this.matrix.turn('left')
        this.zip()
        max = this.calculate()
        this.zip()
        this.matrix.turn('right')
        break
      }
      case 'left': {
        this.zip()
        max = this.calculate()
        this.zip()
        break
      }
      case 'right': {
        this.matrix.turn('back')
        this.zip()
        max = this.calculate()
        this.zip()
        this.matrix.turn('back')
        break
      }
      default:
      throw new Error('Error direction')
    }

    this.updateGameStatus(max)
    this.setRandomBlock(2)
  }

  updateGameStatus(max) {
    if (max >= this._max) {
      this.status.win = true
    }
  }

  zip() {
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

  calculate() {
    let max = 0

    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (j < this._size - 1 && this.matrix.array[i][j] === this.matrix.array[i][j + 1]) {
          const score = this.matrix.array[i][j] * 2

          // update game score
          this.status.score += score
          this.matrix.set(i, j, score)
          this.matrix.clear(i, j + 1)
        }

        // get max
        const num = this.matrix.array[i][j]

        if (num > max) max = num
      }
    }

    return max
  }

  setRandomBlock(num) {
    const emptyRow = this.getRandomEmptyRow()

    if (emptyRow) {
      this._setEmptyBlock(emptyRow, num, this._getRandomNumber())
    } else {
      throw new Error('no empty row, game over')
    }
  }

  haveEmptyBlock() {
    return this.matrix.array.some(innerArr => {
      return innerArr.some(item => item === 0)
    })
  }

  getRandomEmptyRow() {
    if (!this.haveEmptyBlock()) return

    return this._getEmptyRow(this._getRandomNumber())
  }

  _getEmptyRow(rowNumber) {
    const row = this.matrix.array[rowNumber]

    if (row.some(item => item === 0)) {
      return row
    } else {
      return this._getEmptyRow(rowNumber + 1 % this._size)
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
