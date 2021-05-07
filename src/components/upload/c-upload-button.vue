<template>
  <div class="c-upload-button-container block-wrap">
    <el-upload
      :disabled="disabled"
      class="upload-reset block-wrap"
      :accept="accept"
      :list-type="listType"
      :action="action"
      :data="data"
      :http-request="httpRequest"
      :file-list="fileList"

      :limit="limit"
      :on-exceed="handleExceed"

      :before-upload="beforeUpload"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-progress="onProgress"
      :on-preview="onPreview"
      :on-remove="onRemove">
      <el-button
        :disabled="disabled"
        type="primary">增加图片</el-button>
    </el-upload>
    <el-dialog :visible.sync="showPreview"  append-to-body width="38%">
      <img width="100%" :src="previewUrl" alt=""/>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/api/policy-refund'
  export default {
    name: 'c-upload-button',
    components: {},
    data() {
      return {
        file: null,
        // 预览大图
        previewUrl: '',
        showPreview: false,
      }
    },
    props: {
      headers: {
        type: Object,
        default() {
          return {
          }
        }
      },
      // 上传时附带的额外参数
      action: {
        type: String,
        default: `${ process.env.OSS_URL }/oss/getAuthInfo`
      },
      data: {
        type: Object,
        default() {
          return {
            fileDir: 'refund_config'
          }
        }
      },
      fileList: {
        type: Array,
        default() {
          return []
        }
      },
      limit: {
        type: Number,
        default: 5
      },
      listType: {
        type: String,
        default: 'picture-card'
      },
      accept: {
        type: String,
        default: '.jpg,.jpeg,.gif,.png,.bmp'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    watch: {
    },
    methods: {
      httpRequest(){
        this.showLoading()

        Api.getOssInfo( this.data ).then( res => {
          console.log(res, 'res data')
          let data = res.data
          let formData = new FormData()
          let p = {
            'OSSAccessKeyId': data.accessid,
            'key': data.dir + this.file.name,
            'signature': data.signature,
            'policy': data.policy,
            'success_action_status': '200',
            'file': this.file
          }
          for (let key in p){
            formData.append(key, p[key]);
          }
          let xhr = new XMLHttpRequest()

          xhr.onreadystatechange = () => {
            if(xhr.readyState ===4){
              if (xhr.status >= 200 && xhr.status < 300) {
                this.hideLoading()
                this.$message({
                  message: `${this.file.name}上传成功!`,
                  type: 'success'
                });
                let fileUrl = `https:${data.cdnMediaHost}${data.dir}${this.file.name}`
                this.fileList.push({
                  name: this.file.name,
                  url: fileUrl
                })
                console.log(fileUrl, 'emit ossFileUrl')
                console.log(this.fileList, 'emit ossFileList')
                this.$emit('ossFileUrl', fileUrl)
                this.$emit('ossFileList', this.fileList)
              }
            }
          }

          if (location.port !== ''){
            xhr.open('POST', window.location.origin + '/oss/upload', true)
          } else {
            xhr.open('POST', `https:${data.host}`, true)
          }

          xhr.send(formData)
        })
      },
      beforeUpload(file) {
        this.file = file
        console.log(file, 'beforeUpload')
      },
      handleExceed(files, fileList) {
        console.log(fileList, 'handleExceed')
        this.$message.error(`限制上传 ${this.limit} 个文件，已上传 ${this.fileList.length} 个文件`)
      },
      onRemove(file, fileList) {
        console.log(file, fileList, 'onRemove')
        this.$emit('onRemove', fileList)
      },
      onPreview(file) {
        console.log(file, 'onPreview')
        if(/\.(gif|jpg|jpeg|png|bmp)$/.test(file.name)){
          this.previewUrl = file.url
          this.showPreview = true
        }
      },
      onSuccess(res, file, fileList) {
        console.log(res, file, fileList, 'onSuccess')
      },
      onError(err, file, fileList) {
        console.log(err, file, fileList, 'onError')
        this.$message({
          message: `${err}`,
          type: 'error'
        })
      },
      onChange(file, fileList) {
        console.log(file, fileList, 'emit onChange')
        this.$emit('onChange', fileList)
      },
      onProgress(e, file, fileList) {
        console.log(e, file, fileList, 'onProgress')
      },
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .c-upload-button-container {
    .block-wrap {
      display: flex;
      flex-direction: column;
    }
  }
</style>
