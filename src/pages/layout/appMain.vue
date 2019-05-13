<template>
  <div class="appMain-container">
    <router-view></router-view>
    <!--<template v-for="btn in ['编辑', '审核', '删除', '查看', '回访']">-->
      <!--<el-button :type="btnType(btn)">-->
        <!--{{btn}}-->
      <!--</el-button>-->
    <!--</template>-->
  </div>
</template>

<script>
  export default {
    name: 'appMain',
    components: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      // btnType(btn) {
      //   if(btn === '查看' || btn === '回访' ) {
      //     return 'primary'
      //   } else if(btn === '编辑' || btn === '审核' ) {
      //     return 'info'
      //   } else if(btn === '删除' ) {
      //     return 'danger'
      //   }
      // }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .appMain-container {
  }
</style>
