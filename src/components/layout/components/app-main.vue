<template>
  <div class="app-main-container">
      <template v-if="$route.path==='/theme'">
          theme
      </template>
    <router-view>
    </router-view>
  </div>
</template>

<script>

  export default {
    name: 'app-main',
    components: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .app-main-container {
    padding-top: 20px;
  }
</style>
