const HIGH_SCORE = 'high_score'
const GAME_STATUS = 'game_status'

function setHighScore(score) {
  localStorage.setItem(HIGH_SCORE, score)
}

function getHighScore() {
  return parseInt(localStorage.getItem(HIGH_SCORE), 10) || 0
}

function setGameStatus(gameStatus) {
  localStorage.setItem(GAME_STATUS, JSON.stringify(gameStatus))
}

function getGameStatus() {
  return JSON.parse(localStorage.getItem(GAME_STATUS))
}

export {
  setHighScore,
  getHighScore,
  setGameStatus,
  getGameStatus,
}
