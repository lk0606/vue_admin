<template>
  <div class="app-sub-aside-container">
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

          <appSubAside
            v-for="router in addRoutes"
            :router="router"
            :key="router.path"
          >
          </appSubAside>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import appSubAside from './app-sub-aside';
  import { mapGetters } from 'vuex';

  export default {
    name: 'app-aside',
    components: {
      appSubAside
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('user', [
        'addRoutes'
      ])
    },
    watch: {
    },
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
    }
  }
</script>

<style lang="less" scoped>
  .app-sub-aside-container {
    height: inherit;
  }
</style>
