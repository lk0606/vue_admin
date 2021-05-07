<template>
  <div class="c-upload-hand-container">
    <el-upload
      class="upload-hand"
      ref="c-upload-hand"

      drag
      :disabled="disabled"
      :accept="accept"
      :show-file-list="true"
      :with-credentials=true
      :auto-upload="false"
      :multiple="false"

      :limit="limit"
      :on-exceed="handleExceed"

      :action="action"
      :data="data"
      :headers="headers"

      :listType="listType"

      :file-list="fileList"

      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-progress="onProgress"
      :on-preview="onPreview"
      :on-remove="onRemove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
  import Api from '@/api/policy-refund'

  export default {
    name: 'c-upload-hand',
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
      // 上传成功提示
      showTips: {
        type: Boolean,
        default: true
      },
      headers: {
        type: Object,
        default() {
          return {
          }
        }
      },
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
        default: 'text'
      },
      accept: {
        type: String,
        default: '.pdf'
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
                if(this.showTips){
                  this.$message({
                    message: `${this.file.name}上传成功!`,
                    type: 'success'
                  });
                }
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
  .c-upload-hand-container {
  }
</style>

<style lang="less">
  .upload-hand {
    width: 100% ;
    .el-upload {
      width: 100% ;
      .el-upload-dragger {
        width: 100% ;
        height: 200px ;
      }
    }
  }
</style>
