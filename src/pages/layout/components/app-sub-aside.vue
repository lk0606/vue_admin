<template>
  <div class="app-sub-aside-container el-menu-item-reset">

        <el-submenu
          :index="router.path"
          v-if="router.children" >
          <div slot="title" class="title-wrap ">
            <i
              v-if="router.meta.icon"
              :class="`el-icon-${router.meta.icon}`"></i>
            <span>{{router.meta.title}}</span>
          </div>

          <!--递归子导航-->
          <appSubAside
            v-for="child in router.children" :key="child.path"
            :router="child"
          >
          </appSubAside>
        </el-submenu>

        <el-menu-item
          v-else-if="!router.children && !router.hidden"
          :key="router.path"
          :index="router.path">
          <div slot="title" class="title-wrap">
            <i
              v-if="router.meta.icon"
              :class="`el-icon-${router.meta.icon}`"></i>
            <span>{{router.meta.title}}</span>
          </div>
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
    }
  }
</script>

<style lang="less" scoped>
  .app-sub-aside-container {
  }
  .title-wrap {
    text-align: left;
    padding-left: 10px;
  }
</style>
