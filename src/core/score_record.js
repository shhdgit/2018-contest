const HIGH_SCORE = 'high_score'

function setHighScore(score) {
  localStorage.setItem(HIGH_SCORE, score)
}

function getHighScore() {
  return parseInt(localStorage.getItem(HIGH_SCORE), 10)
}

export {
  setHighScore,
  getHighScore,
}
