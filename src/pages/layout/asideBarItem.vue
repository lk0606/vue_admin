<template>
  <div class="asideBarItem-container">

    <template v-if="router">
      <!--一级菜单-->
      <template v-for="(parent, parentKey) in router.children" >
        <el-submenu
          :index="parent.path"
          v-if="parent.hasOwnProperty('children')" :key="parent.path">
          <span slot="title">{{parent.name}}</span>
          <!--二级菜单-->
          <asideBarItem
            v-for="(child, childKey) in parent.children" :key="child.path"
            :router="child"
          >

            <!--<el-submenu-->
              <!--v-if="child.hasOwnProperty('children')"-->
              <!--:index="child.path" >-->
              <!--<span slot="title">{{child.name}}</span>-->

            <!--</el-submenu>-->

            <!--<el-menu-item-->
              <!--v-else-->
              <!--:index="child.path" >-->
              <!--{{child.name}}-->
            <!--</el-menu-item>-->

          </asideBarItem>
        </el-submenu>

        <el-menu-item
          v-else
          :key="parent.path"
          :index="parent.path">
          {{parent.name}}
        </el-menu-item>
      </template>


    </template>
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
