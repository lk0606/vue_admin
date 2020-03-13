<template>
  <div class="index-container">

    <div class="table-container">

      <div class="table-header-wrap">
        <table
          border="0" cellpadding="0" cellspacing="0"
          class="ta-c">
          <colgroup>
            <col v-for="head in tableHeader" :key="head.prop" :width="head.minWidth">
          </colgroup>
          <thead>
          <tr>
            <th
              v-for="head in tableHeader" :key="head.prop"
              :style="{
                'min-width': `${head.minWidth}px`
              }"
            >
              <!--<div class="w100">-->
                {{head.label}}
              <!--</div>-->
              <slot></slot>
            </th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="table-body-wrap">
        <table
          border="0" cellpadding="0" cellspacing="0"
          class="ta-c">
          <colgroup>
            <col v-for="head in tableHeader" :key="head.prop" :width="head.minWidth">
          </colgroup>
          <tbody>
          <tr
            v-for="(item, index) in tableBody" :key="`rows_${index}`">
            <td
              v-for="head in tableHeader" :key="head.prop"
              :style="{
                'min-width': `${head.minWidth}px`
              }"
            >
              {{item[head.prop]}}
              <slot></slot>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
  import {tableData} from "./js/table-data";

  export default {
    name: 'index',
    components: {},
    data() {
      return {
        tableHeader: tableData.tableHeader,
        tableBody: tableData.tableBody,
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
  .index-container {
    line-height: 1.5;
    .table-container {
      overflow-x: auto;
      overflow-y: auto;
      background: #fff;
      width: 800px;
      border: 1px solid gray;
      .table-header-wrap {
        table {
          thead {
            tr {
              th {
                padding: 10px 0;
              }
            }
          }
        }
      }
      .table-body-wrap {
        height: 200px;
        /*overflow-x: auto;*/
        /*overflow-y: auto;*/
        table {
          tbody {
            tr {
              td {
                padding: 10px 0;
              }
            }
          }
        }
      }
    }
  }
</style>
