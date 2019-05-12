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

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'asideBar',
    components: {},
    data() {
      return {
        // router: this.$router.options.routes.slice(1)
      }
    },
    computed: {
      router() {
        console.log(this.$router.options.routes.slice(1))
        return this.$router.options.routes.slice(1)
      }
    },
    watch: {},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
