<template>
  <div class="asideBarItem-container">

    <template v-if="router">
      <!--一级菜单-->
      <template v-for="(one, oneKey) in router" >
        <el-submenu :index="one.path" v-if="one.hasOwnProperty('children')">
          <span slot="title">{{one.name}}</span>
          <!--二级菜单-->
          <template v-for="(two, twoKey) in one.children">
            <el-submenu
              v-if="two.hasOwnProperty('children')"
              :index="two.path" >
              <span slot="title">{{two.name}}</span>
              <!--三级菜单-->
              <!--                      <template v-if="two.hasOwnProperty('children')">-->
              <el-menu-item :index="three.path" v-for="(three, threeKey) in two.children" :key="threeKey">
                {{three.name}}
              </el-menu-item>
              <!--                      </template>-->
            </el-submenu>

            <el-menu-item
              v-else
              :index="two.path" >
              {{two.name}}
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item
          v-else
          :index="one.path">
          {{one.name}}
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
