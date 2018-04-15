<template>
<div class="scene-wrap">
  <div class="scene">
    <div class="block" v-for="i in 16" :key="i"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
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
