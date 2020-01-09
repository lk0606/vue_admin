import cache from '../utils/cache'
// import Timeout = NodeJS.Timeout;

interface CountDown {
    count: number
    refreshEndTime: number | null
    disabled: boolean
}

export default {
  data() {
    return {
      count: 0, // 计时器
      refreshEndTime: null, // 刷新页面时记录结束时间
      disabled: false,
    } as CountDown
  },
  watch: {
    refreshEndTime(refreshEndTime: number) {
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
        timer: NodeJS.Timeout = setInterval(() => {console.log('声明定时器')}, 300)
        // timer: NodeJS.Timeout
        // console.log(timer, 'timer')
        if(this.disabled && +cache.get('refreshEndTime')<new Date().getTime()) {
        this.count = sec
        this.refreshEndTime = now + 1000 * sec
        endTime = now + 1000 * sec
        cache.set('endTime', endTime)
      } else {
        this.refreshEndTime = cache.get('refreshEndTime')
            this.count = Math.ceil( (+cache.get('refreshEndTime')-new Date().getTime() ) / 1000)
      }


      if(timer){
        clearInterval(timer)
      } else {
        timer = setInterval(()=> {
          if(now >= this.refreshEndTime) {
            this.count = 0
            clearInterval(timer)
          } else {
              this.count = Math.ceil( (+cache.get('endTime')-new Date().getTime() ) / 1000)
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
