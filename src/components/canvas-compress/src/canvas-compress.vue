<template>
    <div class="canvas-compress-container">
        <input
            multiple
            @change="handleChange"
            ref="input" type="file"/>
        <div>
            <span>原始图片</span>
            <ul>
                <li v-for="(item, index) in originUrls" :key="index">
                    <img
                        v-if="item"
                        :src="item" alt=""/>
                </li>
            </ul>
        </div>
        <div>
            <span>压缩后图片</span>
            <ul>
                <li v-for="(item, index) in urls" :key="index">
                    <img
                        v-if="item"
                        :src="item" alt=""/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'canvas-compress',
        components: {},
        data() {
            return {
                originUrls: [],
                urls: []
            }
        },
        computed: {},
        watch: {},
        methods: {
            getBase64(files) {
                console.log(files, 'type=file')
                let originUrls = []
                let urls = []
                Object.keys(files).forEach(key=> {
                    if (key!=='length') {
                        const reader = new FileReader()
                        // 将图片转成 base64 格式
                        reader.readAsDataURL(files[key])
                        // 读取成功后的回调
                        reader.onloadend = (e)=> {
                            const originUrl = e.target.result
                            originUrls.push(originUrl)
                            const base64 = e.target.result
                            const url = this.compressImg(base64)
                            urls.push(url)
                            console.log(originUrl, url, 'originUrl')
                        }
                    }
                })
                return {
                    originUrls,
                    urls
                }
            },
            compressImg(base64) {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = 400
                canvas.height = 300
                let img = new Image()
                img.src = base64
                ctx.drawImage(img, 0, 0, 400, 300)
                const url = canvas.toDataURL('image/png', 0.2)
                // canvas.toBlob(callback, mimeType, qualityArgument)
                return url
            },
            handleChange(e) {
                console.log(Array.isArray(e.target.files), 'handleChange')
                console.log(e.target.files, 'handleChange')
                const files = e.target.files
                const { originUrls, urls } = this.getBase64(files)
                console.log(originUrls, urls, 'originUrls, urls')
                this.urls = urls
                this.originUrls = originUrls
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .canvas-compress-container {
    }
</style>
