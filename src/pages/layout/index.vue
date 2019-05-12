<template>
  <el-container class="index-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <asideBar></asideBar>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
          <el-breadcrumb-item v-for="item in levelList" :key="item.path">
            {{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <appMain></appMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import asideBar from './asideBar'
import appMain from './appMain'

export default {
  name: 'index',
  components: {
    asideBar,
    appMain
  },
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    routerKey() {
      // console.log(this.$route.fullPath, 'this.$route.fullPath')
      return this.$route.fullPath
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
//      const first = matched[0]
//      if (first && first.name !== 'dashboard') {
//        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
//      }
      this.levelList = matched
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
</style>
