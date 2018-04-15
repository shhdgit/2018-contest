class Game {
  constructor({ size } = { size: 4 }) {
    this.size = size
    this.array = []

    this.init()
  }

  // init game
  init() {
    this.array = []

    for (let i = 0; i < this.size; i++) {
      const tempArr = []

      for (let j = 0; i < this.size; j++) {
        tempArr.push(0)
      }

      this.array.push(tempArr)
    }

    this.setRandomBlock(2)
    this.setRandomBlock(2)

    return this
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
    return this.array.some(innerArr => {
      return innerArr.some(item => item === 0)
    })
  }

  getRandomEmptyRow() {
    if (!this.haveEmptyBlock()) return

    return this._getEmptyRow(this._getRandomNumber())
  }

  _getEmptyRow(rowNumber) {
    const row = this.array[rowNumber]

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
