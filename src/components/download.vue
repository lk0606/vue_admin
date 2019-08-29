<template>
  <div class="download-container">
    <el-button
      @click="download({}, url, 'get')"
    >下载文件</el-button>
   <el-form>
     <el-form-item label="mixin调用">
       <el-button
         :disabled="count>0"
         @click="getData"
       >
         {{count<=0? '获取验证码' : `${count}s后获取`}}
       </el-button>
     </el-form-item>
     
     
     <el-form-item label="fetch获取脚本">
       <el-button
         @click="getArea"
       >
         获取地区
       </el-button>
       <el-button>
         地区function: {{  area(130185)}}
       </el-button>
     </el-form-item>
   </el-form>
  </div>
</template>

<script>
  import downloadMixin from '../mixins/download'
  import countDownMixin from '../mixins/countDown'
  
  export default {
    name: 'download',
    components: {},
    mixins: [
      downloadMixin,
      countDownMixin
    ],
    data() {
      return {
        url: 'ContentManage/video/988371d6-af85-43f3-aff4-1166b8b67e14.mp4',
        isAreaOk: false,
        areaData: null,
      }
    },
    computed: {},
    watch: {},
    methods: {
      area(code) {
        if( this.areaData &&  this.areaData.length>0) {
          for(let item of this.areaData) {
            if(item && item.code.toString()===code.toString()) {
              return item.name
            }
          }
        }
      },
      async getArea() {
        let myEval=eval
        const url = 'http://res.winbaoxian.com/autoUpload/common/area_b756e27f107a2ff.js'
        // try {
        //   const file = await fetch(url)
        //   const script = await file.text()
        //   console.log(script, 'script')
        //   myEval(script)
        //   console.log(window.area, 'area then')
        //   this.areaData = window.area
        //   // this.isAreaOk = true
        // } catch (err) {
        //     console.log(err)
        // }
        await fetch(url,{})
          .then(res=> res.text())
          .then(data=> {
            console.log(data, 'script')
            myEval(data)
            console.log(window.area, 'area then')
            this.areaData = window.area
            this.isAreaOk = true
        }).catch(err=> {
          console.log(err, 'getArea err')
        })
        
      },
      getData() {
        this.disabled = true
        this.countDown(60, 'download')
      },
    },
    created() {
      this.getArea()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .download-container {
  }
</style>
