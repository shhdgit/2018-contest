<template>
<div class="block">
  <span v-if="num">{{ num }}</span>
</div>
</template>

<script>
export default {
  name: 'block',

  props: ['num'],

  data() {
    return {
    }
  },
}
</script>

<style scoped>
.block {
  position: relative;
}
.block span {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  color: #666;
}
</style>
