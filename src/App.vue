<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    initTitle() {
      document.title = `后台管理-${ this.$route.meta.title ? this.$route.meta.title : ''}`
    }
  },
  watch: {
    $route(route){
      if(route.meta.title){
        this.initTitle()
      }
    }
  }
}

</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
