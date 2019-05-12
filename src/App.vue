<template>
  <div id="app">
    <router-view :key="routerKey"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    routerKey() {
      // console.log(this.$route.fullPath, 'this.$route.fullPath')
      return this.$route.fullPath
    }
  }
}

</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
