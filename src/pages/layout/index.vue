<template>
  <el-container class="index-container">
    <el-header>
      <appNav></appNav>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <appAside></appAside>
      </el-aside>
      <el-main>
        <el-row type="flex"
                align="middle"
                class="nav-bar"
        >
          <el-breadcrumb
            class="breadcrumb"
            separator-class="el-icon-arrow-right">

            <el-breadcrumb-item
              v-for="item in routerList" :key="item.path"
              :to="{ path: `${item.path}` }"
            >
              {{item.meta.title}}
            </el-breadcrumb-item>
          </el-breadcrumb>

            <el-tag
              class="tag"
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
        </el-row>
        <appMain></appMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {appMain, appAside, appNav} from "./components";

export default {
  name: 'index',
  components: {
    appMain,
    appAside,
    appNav,
  },
  data() {
    return {
      routerList: null,
      dynamicTags: ['标签一', '标签二', '标签三'],
    }
  },
  computed: {
  },
  watch: {
    $route(val) {
      if(val) {
        console.log(val, '$route')
      }
      this.getBreadcrumb()
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    getBreadcrumb() {
      this.routerList = this.$route.matched.filter(item => item.name)
      console.log(this.routerList, 'this.routerList')
    }
  },
  created() {
    this.getBreadcrumb()
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .index-container {
    height: 100%;
  }
  .nav-bar {
    border-bottom: 1px solid brown;
    padding-bottom: 20px;
    .breadcrumb {
      margin-right: 50px;
    }
    .tag {
      margin-right: 10px;
    }
  }
</style>
