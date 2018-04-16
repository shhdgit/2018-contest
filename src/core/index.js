import { Matrix } from './matrix'

class Game {
  constructor({ size } = { size: 4 }) {
    this.gameStatus = {
      win: false,
      score: 0,
    }
    this.matrix = new Matrix(size, size)
    this._max = 2048

    this.init()
  }

  // init game
  init() {
    this.setRandomBlock(2)
    this.setRandomBlock(2)

    return this
  }

  move(direction) {
    let max = 0

    switch (direction) {
      case 'bottom': {
        this.matrix.turn('right')
        max = this.calculate()
        this.matrix.turn('left')
        break
      }
      case 'top': {
        this.matrix.turn('left')
        max = this.calculate()
        this.matrix.turn('right')
        break
      }
      case 'left': {
        this.calculate()
        max = this.calculate()
        break
      }
      case 'right': {
        this.matrix.turn('back')
        max = this.calculate()
        this.matrix.turn('back')
        break
      }
      default:
      throw new Error('Error direction')
    }

    this.updateGameStatus(max)
  }

  updateGameStatus(max) {
    if (max >= this._max) {
      this.gameStatus.win = true
    }
  }

  calculate() {
    const calcuArr = new Array(this.size).fill([])
    const newArr = new Array(this.size).fill(new Array(this.size).fill(0))
    let max = 0

    for (let i = 0; i < this.size; i++) {
      // calculate
      for (let j = 0; j < this.size; j++) {
        if (j < this.size - 1 && this.matrix.array[i][j] === this.matrix.array[i][j + 1]) {
          const score = this.matrix.array[i][j] * 2

          // update game score
          this.gameStatus.score += score
          this.matrix.set(i, j, score)
          this.matrix.clear(i, j + 1)
        }

        // set new array
        const num = this.matrix.array[i][j]

        if (num) {
          calcuArr[i].push(num)
        }
        if (num > max) max = num
      }
    }

    calcuArr.forEach((row, i) => {
      row.forEach((num, j) => {
        newArr[i][j] = num
      })
    })

    this.matrix.array = newArr

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
      return this._getEmptyRow(rowNumber + 1 % this.size)
    }
  }

  _setEmptyBlock(row, num, index) {
    if (row[index] === 0) {
      row[index] = num
    } else {
      this._setEmptyBlock(row, num, index + 1 % this.size)
    }
  }

  _getRandomNumber() {
    return Math.floor(Math.random() * this.size)
  }
}

export {
  Game,
}
