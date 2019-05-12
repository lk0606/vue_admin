<template>
  <div class="asideBarItem-container">

        <el-submenu
          :index="router.path"
          v-if="router.hasOwnProperty('children')" >
          <span slot="title">{{router.name}}</span>

          <!--递归子导航-->
          <asideBarItem
            v-for="(child, childKey) in router.children" :key="child.path"
            :router="child"
          >
          </asideBarItem>
        </el-submenu>

        <el-menu-item
          v-else
          :key="router.path"
          :index="router.path">
          {{router.name}}
        </el-menu-item>
  </div>
</template>

<script>
  export default {
    name: 'asideBarItem',
    props: {
      router: {
        type: Object
      }
    },
    components: {},
    data() {
      return {}
    },
    computed: {
      // router () {
      //   return this.$router.options.routes
      // }
    },
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .asideBarItem-container {
  }
</style>
