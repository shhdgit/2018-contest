<template>
<div class="scene-wrap">
  <div class="status-bar">
    <span>分数：{{ game.status.score }}</span>
    <div>
      <button @click="restart">重新开始</button>
    </div>
  </div>
  <v-touch class="scene"
    @swipeup="handleSwipe('up')"
    @swipedown="handleSwipe('down')"
    @swipeleft="handleSwipe('left')"
    @swiperight="handleSwipe('right')">
    <div v-for="(row, index1) in matrix.array" :key="index1">
      <Block
        v-for="(num, index2) in row"
        :class="'score-' + num"
        :key="'' + index1 + index2 + num"
        :num="num"></Block>
    </div>
  </v-touch>
  <h3 class="tips">PC端键盘控制，移动端滑动控制</h3>
</div>
</template>

<script>
import { Game } from 'game-core'

import Block from './components/block.vue'

export default {
  name: 'App',

  components: {
    Block,
  },

  data() {
    return {
      game: null,
      matrix: [],
      keyboardListener: null,
      keyCodeMap: {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right',
      },
    }
  },

  methods: {
    handleSwipe(direction) {
      this.game.move(direction)
    },
    addKeyboardListener() {
      this.keyboardListener = e => {
        const direction = this.keyCodeMap[e.keyCode]

        if (direction) this.game.move(direction)
      }

      document.addEventListener('keyup', this.keyboardListener)
    },
    removeKeyboardListener() {
      document.removeEventListener('keyup', this.keyboardListener)
    },
    restart() {
      this.game = new Game()
      this.game.addWinEvent(() => this.gameover('win'))
      this.game.addDefeatEvent(() => this.gameover('defeat'))
      this.matrix = this.game.matrix
    },
    gameover(status) {
      if (status === 'win') {
        alert('恭喜通关！闲时记得再来一把~')
      }
      else alert('很遗憾，再接再厉吧！')

      this.restart()
    },
  },

  created() {
    this.restart()
    this.addKeyboardListener()
  },

  destroyed() {
    this.removeKeyboardListener()
  },
}
</script>

<style lang="stylus" scoped>
.scene-wrap
  position relative
  width 100%
  max-width 600px
  margin 0 auto
  user-select none

.scene
  position relative
  width 100%
  padding 1%
  border-radius 10px
  background #bbada0
  box-sizing border-box
  &::after
    content ''
    display block
    clear both

.block
  background #cdc0b4
  float left

.tips
  color #999
  text-align center
  margin-top 20px

.status-bar
  display flex
  justify-content space-between
  margin 20px 10px

for $i in 1..11
  .score-{2 ** $i}
    background green(blue(#eadb72, 72 + $i * 20), 150 + $i * 20)
</style>
