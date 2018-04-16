  // |-------->x
  // |
  // |
  // v
  // y

class Matrix {
  constructor(x, y) {
    this.size = { x, y }
    this.array = new Array(y).fill(new Array(x).fill(0))
  }

  turn(direction) {
    switch (direction) {
      case 'left':
      return this.array = turnLeft(this.array)
      case 'right':
      return this.array = turnRight(this.array)
      case 'back':
      return this.array = turnBack(this.array)
      default:
      console.warn('transform.js: turn wrong direction')
      return this.array
    }
  }

  set(x, y, num) {
    this.array[x, y] = num
  }

  clear(x, y) {
    this.setBlock(x, y, 0)
  }
}

function turnLeft(matrix) {
  const x = matrix[0].length
  const y = matrix.length
  const tempMatrix = new Array(x).fill(new Array(y).fill(0))

  for (let i = 1; i <= x; i++) {
    for (let j = 0; j < y; j++) {
      tempMatrix[x - i][j] = matrix[j][i - 1]
    }
  }

  return tempMatrix
}

function turnRight(matrix) {
  const x = matrix[0].length
  const y = matrix.length
  const tempMatrix = new Array(x).fill(new Array(y).fill(0))

  for (let i = 1; i <= x; i++) {
    for (let j = 0; j < y; j++) {
      tempMatrix[i - 1][j] = matrix[j][i - 1]
    }
  }

  return tempMatrix
}

function turnBack(matrix) {
  const x = matrix[0].length
  const y = matrix.length
  const tempMatrix = new Array(x).fill(new Array(y).fill(0))

  for (let i = 1; i <= x; i++) {
    for (let j = 0; j < y; j++) {
      tempMatrix[y - j - 1][x - i] = matrix[j][i - 1]
    }
  }

  return tempMatrix
}

export {
  Matrix,
}
