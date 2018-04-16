<template>
<div class="scene-wrap">
  <div class="scene">
    <div class="block" v-for="i in 16" :key="i"></div>
  </div>
  <div v-for="(row, index) in game.matrix.array">
    <span v-for="(num, index) in row">{{ num }}</span>
  </div>
  <div @click="up">up</div>
  <div @click="down">down</div>
  <div @click="left">left</div>
  <div @click="right">right</div>
</div>
</template>

<script>
import { Game } from 'game-core'

export default {
  name: 'App',
  data() {
    return {
      game: new Game(),
    }
  },

  methods: {
    up() {
      this.game.move('top')
    },
    down() {
      this.game.move('bottom')
    },
    left() {
      this.game.move('left')
    },
    right() {
      this.game.move('right')
    },
  },
}
</script>

<style lang="stylus" scoped>
.scene-wrap
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
</style>
