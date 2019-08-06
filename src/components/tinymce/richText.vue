<template>
  <div class='tinymce-container editor-container'>
    <textarea class='tinymce-textarea' :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <el-button
        @click="dialogFormVisible = true"
        type="primary" size="medium">上传图片</el-button>
    </div>
    <el-dialog
      style="padding: 20px 20px 0 20px;"
      width="66%"
      title="文件上传" :visible.sync="dialogFormVisible">
      <el-form ref="securityDialogForm" :model="securityDialogForm" :rules="rules" label-position="left">
        <el-form-item style="margin-bottom: 0;" >
          <cUploadHand
            accept="gif,jpg,jpeg,png,bmp"
            :showTips="false"
            :fileList="securityDialogForm.fileList"
            :data="{fileDir: 'security_config'}"
            @ossFileList="imageSuccessCBK"
            @onRemove="onRemove"
            @onChange="onChange"
            ref="v-upload-hand"></cUploadHand>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import cUploadHand from '../../components/upload/c-upload-hand'

    export default {
        name: 'tinyMce',
        components: {
          cUploadHand
        },
        props: {
            id: {
                type: String
            },
            value: {
                type: String,
                default: ''
            },
            toolbar: {
                type: Array,
                required: false,
                default() {
                    return ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
                }
            },
            menubar: {
                default: ''
            },
            height: {
                type: Number,
                required: false,
                default: 360
            }
        },
        data() {
            return {
                hasChange: false,
                hasInit: false,
                tinymceId: this.id || 'vue-tinymce-' + +new Date(),
                dialogFormVisible: false,
                securityDialogForm: {
                    localFileList: [],
                    fileList: [],
                },
                rules: {}
            }
        },
        watch: {
            value(val) {
                if (!this.hasChange && this.hasInit) {
                    this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
                }
            }
        },
        mounted() {
            const _this = this
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                height: this.height,
                body_class: 'panel-body ',
                object_resizing: false,
                toolbar: this.toolbar,
                menubar: this.menubar,
                plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools',
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                block_formats: '普通标签=p;小标题=h2;',
                imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
                imagetools_toolbar: 'watermark',
                default_link_target: '_blank',
                link_title: false,
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value)
                    }
                    _this.hasInit = true
                    editor.on('NodeChange Change KeyUp', () => {
                        this.hasChange = true
                        this.$emit('input', editor.getContent({ format: 'row' }))
                    })
                },
                // 整合七牛上传
                // images_dataimg_filter(img) {
                //   setTimeout(() => {
                //     const $image = $(img);
                //     $image.removeAttr('width');
                //     $image.removeAttr('height');
                //     if ($image[0].height && $image[0].width) {
                //       $image.attr('data-wscntype', 'image');
                //       $image.attr('data-wscnh', $image[0].height);
                //       $image.attr('data-wscnw', $image[0].width);
                //       $image.addClass('wscnph');
                //     }
                //   }, 0);
                //   return img
                // },
                // images_upload_handler(blobInfo, success, failure, progress) {
                //   progress(0);
                //   const token = _this.$store.getters.token;
                //   getToken(token).then(response => {
                //     const url = response.data.qiniu_url;
                //     const formData = new FormData();
                //     formData.append('token', response.data.qiniu_token);
                //     formData.append('key', response.data.qiniu_key);
                //     formData.append('file', blobInfo.blob(), url);
                //     upload(formData).then(() => {
                //       success(url);
                //       progress(100);
                //     })
                //   }).catch(err => {
                //     failure('出现未知问题，刷新页面，或者联系程序员')
                //     console.log(err);
                //   });
                // },
                setup(editor) {
                    editor.addButton('h2', {
                        title: '小标题', // tooltip text seen on mouseover
                        text: '小标题',
                        onclick() {
                            editor.execCommand('mceToggleFormat', false, 'h2')
                        },
                        onPostRender() {
                            const btn = this
                            editor.on('init', () => {
                                editor.formatter.formatChanged('h2', state => {
                                    btn.active(state)
                                })
                            })
                        }
                    })
                    editor.addButton('p', {
                        title: '正文',
                        text: '正文',
                        onclick() {
                            editor.execCommand('mceToggleFormat', false, 'p')
                        },
                        onPostRender() {
                            const btn = this
                            editor.on('init', () => {
                                editor.formatter.formatChanged('p', state => {
                                    btn.active(state)
                                })
                            })
                        }
                    })
                }
            })
        },
        methods: {
            imageSuccessCBK(arr) {
                arr.forEach(v => {
                    window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
                })
                this.dialogFormVisible = false
            },
            submitUpload() {
              this.$refs['securityDialogForm'].validate((valid) => {
                if (valid) {
                  if(this.securityDialogForm.localFileList <=0 ) {
                    this.$message({
                      duration: 2000,
                      message: '请上传图片',
                      type: 'warning'
                    })
                  } else {
                    this.$refs['v-upload-hand'].$refs['c-upload-hand'].submit()
                  }
                } else {
                  console.log('error valid...')
                  return false
                }
              })
          },
            onRemove(fileList) {
                console.log(fileList, 'onRemove')
                this.securityDialogForm.fileList = fileList
            },
            onChange(localFileList) {
                console.log(localFileList, 'onChange')
                this.securityDialogForm.localFileList = localFileList
            },
        },
        destroyed() {
            window.tinymce.get(this.tinymceId).destroy()
        }
    }
</script>

<style scoped>
  .tinymce-container {
    position: relative
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 15px;
    /*z-index: 2005;*/
    top: 18px;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
