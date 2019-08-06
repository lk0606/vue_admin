import fetch from '@/utils/fetch';
const ossUrl = process.env.OSS_URL
export default {
    /* 添加产品退保配置 */
    saveProductCancellationConfig(params) {
        return fetch({
            url: '/cancellation/saveProductCancellationConfig',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    //获取产品退保列表
    getProductConfigList(params) {
        return fetch({
            url: '/cancellation/getProductConfigList',
            method: 'get',
            params
        }).then(({data}) => data)
    },
    //获取具体产品的退保配置信息
    getProductConfig(params) {
        return fetch({
            url: '/cancellation/getProductConfig',
            method: 'get',
            params
        }).then(({data}) => data)
    },
    //获取oss上传参数
    getAuthInfo(params) {
        return fetch({
            baseURL: ossUrl,
            url: '/oss/getAuthInfo',
            method: 'get',
            params
        }).then(({data}) => data)
    },
    //获取oss上传参数
    getOssInfo(params) {
        return fetch({
            baseURL: ossUrl,
            url: '/oss/getAuthInfo',
            method: 'get',
            params
        })
    },
    //退保数据列表
    list(params) {
        return fetch({
            url: '/cancellation/list',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    //退保数据总条数
    countList(params) {
        return fetch({
            url: '/cancellation/countList',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    //退保初审
    wyReview(params) {
        return fetch({
            url: '/cancellation/wyReview',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    //查询退保详情
    info(params) {
        return fetch({
            url: '/cancellation/info',
            method: 'get',
            params
        }).then(({data}) => data)
    },
    //导出数据(险企审核)
    download(params) {
        return fetch({
            url: '/cancellation/download',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    //退保险企审核
    corpReview(params) {
        return fetch({
            url: '/cancellation/corpReview',
            method: 'post',
            data:params
        }).then(({data}) => data)
    },
    /* 获取审批详情分公司列表 */
    getBranchCompany(data) {
        return fetch({
            url: '/changePolicy/getFcoList',
            method: 'get',
            params: data
        })
    },
    /* 获取OCR银行卡卡号 bankImgURL*/
    getBankCarNum(data) {
        return fetch({
            url: '/traceInfo/getBankCarNum',
            method: 'get',
            params: data
        })
    },
}
