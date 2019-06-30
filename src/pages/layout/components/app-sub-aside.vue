<template>
  <div class="app-sub-aside-container">

        <el-submenu
          :index="router.path"
          v-if="router.hasOwnProperty('children')" >
          <span slot="title">{{router.meta.title}}</span>

          <!--递归子导航-->
          <appSubAside
            v-for="child in router.children" :key="child.path"
            :router="child"
          >
          </appSubAside>
        </el-submenu>

        <el-menu-item
          v-else
          :key="router.path"
          :index="router.path">
          {{router.meta.title}}
        </el-menu-item>
  </div>
</template>

<script>
  export default {
    name: 'appSubAside',
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
    },
    watch: {},
    methods: {
    },
    created() {
    },
    mounted() {
      // this.initTitle()
    }
  }
</script>

<style lang="scss" scoped>
  .app-sub-aside-container {
  }
</style>
