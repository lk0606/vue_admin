<template>
  <div class="download-container">
    <el-button
      @click="download({}, url, 'get')"
    >下载文件</el-button>
  </div>
</template>

<script>
  import downloadMixin from '../mixins/download'

  export default {
    name: 'download',
    components: {},
    mixins: [downloadMixin],
    data() {
      return {
        url: 'ContentManage/video/988371d6-af85-43f3-aff4-1166b8b67e14.mp4',
      }
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

<style lang="less" scoped>
  .download-container {
  }
</style>
