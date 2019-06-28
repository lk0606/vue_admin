<template>
  <div class="login-container">
    <el-form
      ref="login"
      :rules="rules"
      :model="login"
    >
      <el-form-item label="">

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        login: {

        },
        rules: {

        }
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
  }
</style>
