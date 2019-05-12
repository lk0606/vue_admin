<template>
  <el-container class="index-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <asideBar></asideBar>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view :key="routerKey"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideBar from './asideBar'
export default {
  name: 'index',
  components: {
    asideBar
  },
  data() {
    return {}
  },
  computed: {
    routerKey() {
      // console.log(this.$route.fullPath, 'this.$route.fullPath')
      return this.$route.fullPath
    }
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
