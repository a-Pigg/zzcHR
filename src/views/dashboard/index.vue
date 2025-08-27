<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 设置 icon-class=图标名字（没有后缀） -->
    <svg-icon icon-class="dashboard" class-name="dashboard-icon" />
    <svg-icon icon-class="eye"></svg-icon>
    <svg-icon icon-class="skill"></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
