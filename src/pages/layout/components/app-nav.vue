<template>
  <div class="app-nav-container">
    <el-button
      class="logout"
      size="medium"
      type="warning"
      @click="logout"
    >登出</el-button>
  </div>
</template>

<script>
  export default {
    name: 'app-nav',
    components: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      logout() {
        this.$store.dispatch('user/logout').then(res=> {
          this.$message({
            type: 'success',
            duration: 800,
            message: `${res}`
          })
          this.$router.push('/login')
        })
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .app-nav-container {
  }
</style>
