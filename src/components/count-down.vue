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
      <el-button
          id="button"
        @click="getAuthCode"
      >
        {{`重写获取验证码${countDownInfo.count >0 ? countDownInfo.count : ''}`}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import cache from '@/utils/cache'
  import { getAuthCode, getCode, CountDown } from '@/utils/tools.js'

  export default {
    data() {
      return {
        count: 0, // 计时器
        countDownInfo: {
            count: 0,
            endTimeKey: ''
        }, // 计时器
        refreshEndTime: null, // 刷新页面时记录结束时间
        disabled: false,
      }
    },
    watch: {
      refreshEndTime(refreshEndTime) {
        cache.set('refreshEndTime', refreshEndTime)
      },
        countDownInfo: {
          handler(countDownInfo) {

          },
          deep: true
        }
    },
    methods: {
        timeFn() {
          let count = 0
          setInterval(()=> {
             return count++
          }, 1000)
        },
        async getAuthCode() {
            const dom = document.querySelector('#button')
            // for(let i = 0; i<10; i++) {
            //     await getCode(10, 1, dom).then(countDownInfo=> {
            //         this.countDownInfo = countDownInfo
            //         console.log(this.countDownInfo, 'getAuthCode')
            //     })
            // }
            // console.log(this.timeFn(), 'timeFn')
            const c = new CountDown({
                sec: 10
            })
            c.start().then(countDownInfo=> {
                this.countDownInfo = countDownInfo
                console.log(this.countDownInfo, 'getAuthCode')
            })
        },
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

<style lang="scss" scoped>
  .one2-container {
  }
</style>
