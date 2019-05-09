export function dateFormat(time, format) {
    if (time) {
        var date = new Date(parseInt(time))
        try {
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            var week = {
                "0": "日",
                "1": "一",
                "2": "二",
                "3": "三",
                "4": "四",
                "5": "五",
                "6": "六"
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            if (/(E+)/.test(format)) {
                format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
                }
            }
        } catch (err) {
            return ''
        }
        return format
    } else {
        return ''
    }
}

export function mobileFormat(mobile) {
    if (mobile) {
        var moblieArr = (mobile + '').split('')
        var str = moblieArr.slice(0, 3) + '****' + moblieArr.slice(7)
        return str.replace(/,/g, '')
    } else {
        return ''
    }
}

export function percentage(value) {
  let m = Math.pow(10, 2);
  return Math.round(value * 100 * m, 10) / m
}
export function percentageDefault(value) {
  let m = Math.pow(10, 2);
  return Math.round(value * m, 10) / m
}

// 小数精度问题
export function fixed(num, length) {
  return parseFloat( num ).toFixed( length )
}

export function personTypeInfo(value) {
  if(!value){
    return ''
  }else{
    return {
      '1':"投保人",
      '2':"被保险人",
      '3':"受益人",
      '4':"业务员"
    }[value + '']
  }
  
}
