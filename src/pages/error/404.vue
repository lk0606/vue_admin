<template>
  <div class="404-container">
    404 not found

    <el-button
      @click="$router.push('/login')"
    >
      去登录
    </el-button>
    <!--<el-button>-->
      <!--去首页-->
    <!--</el-button>-->
  </div>
</template>

<script>
  export default {
    name: 'error-404',
    components: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .404
  -container {
  }
</style>
