
// class countDown {
//     constructor(opt) {
//         this.sec = opt.sec
//
//     }
// }
import cache from '@/utils/cache'

export class CountDown {
    constructor(opt) {
        this.sec = opt.sec
        this.uniqueKey = opt.uniqueKey ? `endTime_${opt.uniqueKey}` : `endTime`

        this.now = new Date().getTime()
        this.allTs = this.now * 1000
        this.endTime = null
        this.count = 0
        this.timer = null
    }
    init() {
        if(cache.get(this.uniqueKey)) {
            this.endTime = cache.get(this.uniqueKey)
        } else if(this.sec){
            this.endTime = this.now + this.allTs
            cache.set(this.uniqueKey, this.endTime)
        }
        this.count = cache.get(this.uniqueKey) ? Math.ceil((cache.get(this.uniqueKey) - new Date().getTime()) / 1000) : 0
    }
    async start() {
        this.init()
        let count
        if(this.count>0) {
            count = this.count
        } else if(this.sec) {
            count = this.sec
        }
        for(let i = 0; i<count; i++) {
            await this.timeOut().then(res=> {
                return res.count
            })
        }
    }
    timeOut() {
        return new Promise( resolve => {
            if (this.timer) {
                clearTimeout(this.timer)
                cache.rm(this.uniqueKey)
            } else {
                this.timer = setTimeout(() => {
                    if (this.now >= this.endTime) {
                        this.count = 0
                        clearTimeout(this.timer)
                        cache.rm(this.uniqueKey)
                    } else {
                        this.count = Math.ceil((cache.get(this.uniqueKey) - new Date().getTime()) / 1000)
                        // console.log((cache.get('refreshEndTime')-new Date().getTime() ) / 1000, this.count, 'count')
                        if (this.count <= 0) {
                            this.count = 0
                            clearTimeout(this.timer)
                            cache.rm(this.uniqueKey)
                            // cache.rm('count')
                        } else {
                            // cache.set('count', count)
                            // getAuthCode(sec, uniqueKey)
                        }
                        resolve({
                            count: this.count,
                            endTimeKey: this.uniqueKey
                        })
                        console.log(this.count, 'count')
                    }
                }, 1000)
            }
        })
    }
}

export function getCode(sec, uniqueKey) {
    const now = new Date().getTime(),
        allTs = sec * 1000
    let endTime,
        count = 0,
        timer
    uniqueKey = uniqueKey ? `endTime_${uniqueKey}` : `endTime`
    if(cache.get(uniqueKey)) {
        endTime = cache.get(uniqueKey)
    } else if(sec){
        endTime = now + allTs
        cache.set(uniqueKey, endTime)
    }
    return new Promise( resolve => {
        if (timer) {
            clearTimeout(timer)
            cache.rm(uniqueKey)
        } else {
            timer = setTimeout(() => {
                if (now >= endTime) {
                    count = 0
                    clearTimeout(timer)
                    cache.rm(uniqueKey)
                } else {
                    count = Math.ceil((cache.get(uniqueKey) - new Date().getTime()) / 1000)
                    // console.log((cache.get('refreshEndTime')-new Date().getTime() ) / 1000, this.count, 'count')
                    if (count <= 0) {
                        count = 0
                        clearTimeout(timer)
                        cache.rm(uniqueKey)
                        // cache.rm('count')
                    } else {
                        // cache.set('count', count)
                        // getAuthCode(sec, uniqueKey)
                    }
                    resolve({
                        count,
                        endTimeKey: uniqueKey
                    })
                    console.log(count, 'count')
                }
            }, 1000)
        }
    })
}

export function getAuthCode(sec, uniqueKey, dom) {
    console.log(dom, 'dom')
    const now = new Date().getTime(),
        allTs = sec * 1000
    let endTime,
        count = 0,
        timer
    uniqueKey = uniqueKey ? `endTime_${uniqueKey}` : `endTime`
    return new Promise(resolve => {
        if(cache.get(uniqueKey)) {
            endTime = cache.get(uniqueKey)
        } else if(sec){
            endTime = now + allTs
            cache.set(uniqueKey, endTime)
        }
        if(timer){
            clearInterval(timer)
            cache.rm(uniqueKey)
        } else {
            timer = setInterval(()=> {
                if(now >= endTime) {
                    count = 0
                    clearInterval(timer)
                    cache.rm(uniqueKey)
                } else {
                    count = Math.ceil( (cache.get(uniqueKey)-new Date().getTime() ) / 1000)
                    // console.log((cache.get('refreshEndTime')-new Date().getTime() ) / 1000, this.count, 'count')
                    if(count<=0) {
                        count = 0
                        clearInterval(timer)
                        cache.rm(uniqueKey)
                        // cache.rm('count')
                    } else {
                        // cache.set('count', count)
                        // getAuthCode(sec, uniqueKey)
                    }
                    resolve({
                        count,
                        endTimeKey: uniqueKey
                    })
                    dom.innerText = count
                    console.log(count, 'count')
                }
            },1000)
        }
    })
}

function t(){
    (function($){
        var funObj = {
            timeUserFun: 'timeUserFun',
        }
        console.log('$',$)
        $[funObj.timeUserFun] = function(time){
            var time = time || 0.1;
            var userTime = time*60;
            var objTime = {
                init:0,
                time(){
                    objTime.init += 1;
                    if(objTime.init == userTime){
                        console.log('用户到达未操作事件') // 用户到达未操作事件 做一些处理
                        console.log("用户长时间没有操作页面,即将跳转到登录页面");
                    }
                },
                eventFun(){
                    clearInterval(testUser);
                    objTime.init = 0;
                    testUser = setInterval(objTime.time,1000);
                }
            }
            var testUser = setInterval(objTime.time,1000);
        }
        console.log($[funObj.timeUserFun])
    })(window)
//   直接调用 参数代表分钟数,可以有一位小数;
    timeUserFun();
}
