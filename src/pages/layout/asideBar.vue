<template>
  <div class="aside-container">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          router
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <asideBarItem
            :router="routers"
          >
          </asideBarItem>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import asideBarItem from './asideBarItem'
  export default {
    name: 'asideBar',
    components: {
      asideBarItem
    },
    data() {
      return {
      }
    },
    computed: {
      routers () {
        return this.$router.options.routes[0]
      }
    },
    watch: {},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath, 'handleOpen');
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath, 'handleClose');
      }
    },
    created() {
    },
    mounted() {
      // console.log(this.$router.options.routes[1])
    }
  }
</script>

<style lang="scss" scoped>
  .aside-container {
    height: inherit;
  }
</style>
