<template>
  <div class="range-test-container">
    <cRange v-model="value" :disabled="false">
<!--      <div slot="start"-->
<!--           style="width: 3rem; height: 3rem;background: red;"-->
<!--           @click="value>0?value&#45;&#45;:0">-->
<!--      </div>-->
<!--      <div-->
<!--          @click="value<100?value++:100"-->
<!--          style="width: 3rem; height: 3rem;background: red;"-->
<!--          slot="end">-->
<!--      </div>-->
      <div slot="start"
           @click="value>0?value--:0"
      >
        <bxs-icon
            name="reduce-plain" size="1.05rem" color="#FF5000" class=""></bxs-icon></div>
      <div slot="end"
           @click="value<100?value++:100"
      >
        <bxs-icon
            name="add-plain" size="1.05rem" color="#FF5000" class=""></bxs-icon></div>
    </cRange>
    value: {{value}}
  </div>
</template>

<script>
  import cRange from '@/components/range/c-range'

  export default {
    name: 'range-test',
    components: {
      cRange,
    },
    data() {
      return {
        value: 10
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .range-test-container {
  }
</style>