<template>
  <div class="c-form-template-container">
    <el-form
      :ref="form.ref"
      :rules="form.rules"
      :model="form.model">
      <template
        v-for="(item, index) in form.model">
        <el-form-item
          label=""
        >
          <el-input>
          </el-input>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'c-form-template',
    components: {},
    data() {
      return {}
    },
    props: {
      form: {
        type: Object,
        default() {
          return {
            ref: 'ref_name',
            rules: {

            },
            model: [
              {
                name: '',
                label: ''
              },
              {
                password: '',
              }
            ]
          }
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
  .c-form-template-container {
  }
</style>
