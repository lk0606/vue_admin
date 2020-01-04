
import fetch from '@/utils/fetch'
const ossUrl = process.env.OSS_URL
export default {
    //获取oss上传参数
    getOssInfo(params: object) {
        return fetch({
            baseURL: ossUrl,
            url: '/oss/getAuthInfo',
            method: 'get',
            params
        })
    }
}
