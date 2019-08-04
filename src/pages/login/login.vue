<template>
  <div class="login-container flex-center h100">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="80px"
      label-position="left"
      class="login-form">

      <el-form-item label="账号" prop="name">
        <el-input
          clearable
          placeholder="请输入账号"
          v-model="loginForm.name"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="密码" prop="pass">
        <el-input
          clearable
          show-password
          placeholder="请输入密码"
          v-model="loginForm.pass"
        ></el-input>
      </el-form-item>

      <el-form-item
        label-width="0">
        <el-button
          @click="login"
          class="login w100"
          type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/login";

export default {
  name: 'login',
  components: {},
  data() {
    return {
      loginForm: {
        name: 'superAdmin',
        pass: '123'
      },
      rules: {
        name: [
          {required: true, message: '请输入账号', trigger: ['blur', 'change']},
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: ['blur', 'change']},
        ],
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', this.loginForm).then(res=> {
        this.$message({
          type: 'success',
          duration: 800,
          message: `${res.data[0].name}，${res.info}`
        })
        this.$router.push('/')
      }).catch(err=> {
        this.$message.error(err)
      })
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    background: #f2f2f2;
    .login-form {
      .login {
        letter-spacing: 6px;
      }
    }
  }
</style>
