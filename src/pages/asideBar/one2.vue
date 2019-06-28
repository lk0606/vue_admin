<template>
  <div class="one2-container">
    一级菜单2
<!--    <div>-->
<!--      <el-button-->
<!--        :disabled="count>0"-->
<!--        @click="getData"-->
<!--      >-->
<!--        {{count<=0? '获取验证码' : `${count}s后获取`}}-->
<!--      </el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
  import { Icon, Button, ProfessionList } from 'bxs-ui-vue'
  import cache from '@/utils/cache'

  export default {
    name: 'one2',
    components: {
      [ProfessionList.name]: ProfessionList,
    },
    data() {
      return {
        count: null,
        refreshEndTime: null,
        endTime: null
      }
    },
    computed: {
    },
    watch: {
      refreshEndTime(refreshEndTime) {
        cache.set('endTime', refreshEndTime)
      },
      count(count) {
        cache.set('count', count)
      },
    },
    methods: {
      getData() {
        this.countDown()
      },
      countDown() {
        this.initCount()
        const start = new Date().getTime()

        let timer = null
        if(timer){
          timer = null
          clearInterval(timer)
        } else {
          timer = setInterval(()=> {
            if(start >= this.refreshEndTime) {
              this.count = 0
              clearInterval(timer)
            } else {
              console.log((this.refreshEndTime - start) / 1000, '(this.refreshEndTime - start) / 1000')
              // this.count = Math.floor((this.refreshEndTime - start) / 1000)
              this.count--
              if(this.count<=0) {
                this.count = 0
                clearInterval(timer)
              }
            }
          },1000)
        }
      },
      cutCount() {
        const start = new Date().getTime()

        let timer = null
        if(timer){
          timer = null
          clearInterval(timer)
        } else {
          timer = setInterval(()=> {
            if(start >= this.refreshEndTime) {
              this.count = 0
              clearInterval(timer)
            } else {
              console.log((this.refreshEndTime - start) / 1000, '(this.refreshEndTime - start) / 1000')
              // this.count = Math.floor((this.refreshEndTime - start) / 1000)
              this.count--
              if(this.count<=0) {
                this.count = 0
                clearInterval(timer)
              }
            }
          },1000)
        }
      },
      initCount() {
        this.refreshEndTime = cache.get('endTime')
        this.count = cache.get('count')
        if(!this.count) {
          this.count = 30

          const start = new Date().getTime()
          this.refreshEndTime = start + 1000 * 30
        }
      }
    },
    created() {
    },
    mounted() {
      this.count = cache.get('count')
      if(this.count) {
        this.countDown()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .one2-container {
  }
</style>
