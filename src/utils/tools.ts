
// class countDown {
//     constructor(opt) {
//         this.sec = opt.sec
//
//     }
// }
import cache from '@/utils/cache'

export function getAuthCode(sec, uniqueKey) {
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
