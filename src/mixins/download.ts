
import fetch from '../utils/request'

export default {
  data() {
    return {
      // loading: false
    }
  },
  methods: {
    download(data: object, url: string, method: string) {
      this.loading = true
      return fetch({
        url: url || '/api',
        method: method ||'post',
        data: data,
        responseType: 'blob',
        baseURL: '/mp4/', // api的base_url
        headers: {
        //   'content-type': 'application/octet-stream;charset=utf-8;application/vnd.ms-excel'
        //   'content-type': 'application/vnd.ms-excel;charset=utf-8',
        //   'content-type': 'video/mp4'
        }
      }).then(data=> {
        console.log(data, 'download')
        // let code = decodeURI(data.headers['code'])
        // console.log(code, 'code')
        // if (code === 0) {
          console.log('下载成功')
          // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
          // let fileName = decodeURI(data.headers['content-disposition'].split(';')[1].split('=')[1])
          // 将`blob`对象转化成一个可访问的`url`
          let url = window.URL.createObjectURL(new Blob([data.data]))
          console.log(url, 'url')
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'download.mp4')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.loading = false
        // }
      }).catch(err=> {
        console.log(err, 'catch')
        this.loading = false
      })
    }
  }
}
