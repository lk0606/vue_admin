<template>
  <div class="one2-container">
    倒计时
    <div>
      <el-button
        :disabled="count>0"
        @click="getData"
      >
        {{count<=0? '获取验证码' : `${count}s后获取`}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import cache from '@/utils/cache'

  export default {
    data() {
      return {
        count: 0, // 计时器
        refreshEndTime: null, // 刷新页面时记录结束时间
        disabled: false,
      }
    },
    watch: {
      refreshEndTime(refreshEndTime) {
        cache.set('refreshEndTime', refreshEndTime)
      },
    },
    methods: {
      getData() {
        this.disabled = true
        this.countDown()
      },
      countDown(sec=60) {
        let
          now = new Date().getTime(),
          endTime,
          timer = null

        if(this.disabled && cache.get('refreshEndTime')<new Date().getTime()) {
          this.count = sec
          this.refreshEndTime = now + 1000 * sec
          endTime = now + 1000 * sec
          cache.set('endTime', endTime)
        } else {
          this.refreshEndTime = cache.get('refreshEndTime')
          this.count = Math.ceil( (cache.get('refreshEndTime')-new Date().getTime() ) / 1000)
        }


        if(timer){
          clearInterval(timer)
        } else {
          timer = setInterval(()=> {
            if(now >= this.refreshEndTime) {
              this.count = 0
              clearInterval(timer)
            } else {
              this.count = Math.ceil( (cache.get('endTime')-new Date().getTime() ) / 1000)
              // console.log((cache.get('refreshEndTime')-new Date().getTime() ) / 1000, this.count, 'count')
              if(this.count<=0) {
                this.count = 0
                clearInterval(timer)
              }
            }
          },1000)
        }
      },
    },
    created() {
    },
    mounted() {
      this.countDown()
    },
  }
</script>

<style lang="less" scoped>
  .one2-container {
  }
</style>
