import cache from '../utils/cache'

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
    // getData() {
    //   this.disabled = true
    //   this.countDown()
    // },
    countDown(sec=5) {
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
