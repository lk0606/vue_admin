# range
> A component extend mint-ui

## Usage
```vue
<template>
    <div>
        <cRange v-model="value">
            <div slot="start"
                 @click="value>0?value--:0">-</div>
            <div
                @click="value<100?value++:100" slot="end">+</div>
        </cRange>
    </div>
</template>
<script>
import cRange from 'range'

export default {
  data() {
      return {
        value: 5
      }
  },
  components: {
    cRange
  }
}
</script>
```

## API

| Option | type | description |
| ----- | ----- | ----- |
| value | Number(default: 0)  | 绑定值（必填），使用v-model绑定 |
| min | Number(default: 0)  | 最小值 |
| max | Number(default: 0)  | 最大值 |
| step | Number(default: 0)  | 步长 |
| disabled | Boolean(default: false)  | 是否禁用状态 |
| disabledBg | String(default: #d64a0a)  | 禁用状态下的颜色（包括激活背景和控制按钮） |
| barLen | String(default: 12px)  | range宽度 |
| barRadius | String(default: 6px)  | range radius |
| btnSize | String(default: 30px)  | 控制按钮大小 |
| btnColor | String(default: #FF5000)  | 控制按钮颜色 |
| vertical | Boolean(default: false)  | 是否垂直显示（待开发） |
| defaultBg | String(default: #e5e5e5)  | 未激活背景 |
| activeBg | String(default: #e5e5e5)  | 激活背景色 |
