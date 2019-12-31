<template>
<div class="app-container promo">
  <header>
    <p>配置Promotion</p>
    <div style="width:20px;height:10px;"></div>
    <el-button @click="getDefault" :disabled="hasDefaultConfig">拉取默认值(之前未配置过)</el-button>
    <el-button @click="getConfigData" type="primary" :disabled="!hasDefaultConfig">拉取已有配置(之前已有配置)</el-button>
  </header>
  <h3>{{getTitle}}</h3>
  <div class="btns" >
    <el-dropdown @command="handleNewPromoData">
     <el-button type="primary">{{typeText}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="i+1" v-for="(k,i) in 5" :key=i>类型{{i+1}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button @click="treeReflectionChange">保存该类型</el-button>
    <el-button type="danger" size="small" @click="deletePromotion" v-show="hasDefaultConfig">删除Promotion(慎用)</el-button>
  </div>
    <div class="configArea">
      <div class="left">
        <vue-tree-list
          :model="treeData"
          default-tree-node-name="new node"
          default-leaf-node-name="new leaf"
          :default-expanded="false"
          @click="handleTreeClick"
          @change-name="handleTreeChangeName"
          @delete-node="handleTreeDelNode"
          @add-node="handleTreeAddNode"
          >
            <!-- <span  slot="addTreeNode">新增父项</span>
            <span  slot="addLeafNode">新增子项</span>
            <span  slot="editNode">修改</span>
            <span  slot="delNode">删除</span> -->
        </vue-tree-list>
      </div>
      <div class="right">
        <el-card v-show="JSON.stringify(form)!=='{}' ">
          <el-form :model="form" label-position="left" label-width="150px">
            <el-form-item
              v-for="(val, name, index) in form"
              :key="index"
              :label="name"
              :prop="name"
            >
            <el-input v-if="typeof val !== 'boolean' " v-model.trim="form[name]" :disabled="checkFormDisabled(name)"></el-input>
            <el-switch v-model="form[name]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="true"
              inactive-text="false"
              v-else></el-switch>
            </el-form-item>
          </el-form>
          <el-button @click.prevent="saveItem" type="success" size="medium" plain>保存</el-button>
        </el-card>
      </div>

    </div>
    <div class="configTable" v-if='false'>
      <el-table
       :data="tableData"
      >
        <el-table-column
          type="expand"
        >
          <template slot-scope="props">
            <inner-form :row=props.row></inner-form>
          </template>
        </el-table-column>
        <el-table-column label="用户类型" prop="discountTypeId">

        </el-table-column>
         <el-table-column label="promotion类型" prop="promMsg">

        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script lang="ts">
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
import promoData from './promotionDemo'

export default {
  name:"setPromotion",
  components:{VueTreeList},
  data(){
    return {
      submitData: null,
      nodeList: {
        category: null,
        discountTypeId: null,
        id: null,
        promId: null,
      },
      bundleID:'',
      treeData:{},
      hasDefaultConfig:false,
      pType:0,
      id:0,
      form:{},
      promoData
    }
  },
  created(){
  },
  mounted(){
    // window.newPromo = promoData
  },
  computed:{
    getTitle(){
      return this.newPromo.productId
    },
    newPromo () {
      return promoData
    },
    typeText(){
      return this.pType === 0 ? '更多类型' : '当前类型：' + this.pType
    }
  },
  methods:{
    resetNodeList() {
      this.nodeList = {
        category: null,
        discountTypeId: null,
        id: null,
        promId: null,
      }
    },
    findItemKey(data) {
      return Object.keys(this.nodeList).find((key)=> {
        for(let subKey of Object.keys(data)) {
          if(key===subKey) {
            return key
          }
        }
      })
    },
    saveItem() {
      console.log(this.form, this.nodeList, this.treeData, 'saveItem')
      // this.nodeList
      // this.treeData
      // this.promoData
      const curKey = this.findItemKey(this.form)
      console.log(curKey, 'saveItem curKey')
      this.formatData(curKey, this.promoData.categoryList)
      // console.log(this.promoData.categoryList, 'this.promoData')
      this.handleNewPromoData(this.nodeList.category)
    },
    formatData(curKey, categoryList) {
      for(let item of categoryList) {
        if(item.hasOwnProperty(curKey) && item[curKey]===this.nodeList[curKey]) {
          // item = {
          //   ...item,
          //   ...this.form
          // }
          item = Object.assign(item, this.form)
          console.log(this.promoData.categoryList, 'formatData this.promoData')
          console.log(item, 'item')
          return
        } else {
          if(this.isObject(item)) {
            for(let subItem of Object.keys(item)) {
              if(Array.isArray(item[subItem])) {
                this.formatData(curKey, item[subItem])
              }
            }
          }
          else if(Array.isArray(item)) {
            this.formatData(curKey, item)
          }
        }
      }
    },
    findAllNode(obj) {
      if(obj.hasOwnProperty('parent') && obj.parent && obj.parent.values) {
        this.setNodeData(obj.parent.values)
        this.findAllNode(obj.parent.values)
      }
    },
    setNodeData(obj) {
      if(obj.hasOwnProperty('discountTypeId')&&obj.discountTypeId) {
        this.nodeList.discountTypeId = obj.discountTypeId
      }
      else if(obj.hasOwnProperty('id')&&obj.id) {
        this.nodeList.id = obj.id
      }
      else if(obj.hasOwnProperty('promId')&&obj.promId) {
        this.nodeList.promId = obj.promId
      }
    },
    handleTreeClick(node){
      // console.log(node, node.values, 'handleTreeClick node.values')
      this.form = {}
      this.form = node.values
      this.setNodeData(node.values)
      this.findAllNode(node)
      console.log(this.nodeList, 'handleTreeClick this.nodeList...')
      console.log(this.treeData, 'handleTreeClick this.treeData...')
    },
    handleNewPromoData(type){
      this.pType=type
      this.treeData = {}
      let id=0
      let Data = this.promoData.categoryList.filter(item => item.category === type)[0]
      console.log('TCL: handleNewPromoData -> Data', Data)

      if(Data.hasOwnProperty('category')&&Data.category) {
        this.resetNodeList()
        this.nodeList.category = Data.category
      }

      let TreeData = []
     for(let i=0;i<Data.discountPromotion.length;i++){
        let item = Data.discountPromotion[i]
        let itemValue=JSON.parse(JSON.stringify(item))
        delete itemValue.promotionList
        let obj = {
          name:'用户类型 - '+ item.discountTypeId,
          id:id++,
          dragDisabled: true,
          addTreeNodeDisabled: false,
          addLeafNodeDisabled: false,
          editNodeDisabled: false,
          delNodeDisabled: false,
          values:itemValue
        }
        if(item.promotionList && item.promotionList.length > 0){
          obj.children=[]
          for(let j=0;j<item.promotionList.length;j++){
            let ele = item.promotionList[j],
            values=JSON.parse(JSON.stringify(ele))
            delete values.iapList
            let promotionList={
              name:ele.promMsg,
              id:id++,
              dragDisabled: true,
              addTreeNodeDisabled: false,
              addLeafNodeDisabled: false,
              editNodeDisabled: false,
              delNodeDisabled: false,
              values:values
            }
            if(ele.iapList && ele.iapList.length > 0){
              promotionList.children=[]
              for(let k=0;k<ele.iapList.length;k++){
                let iap={
                  name: ele.iapList[k].promIapId,
                  id:id++,
                  dragDisabled: true,
                  addTreeNodeDisabled: true,
                  addLeafNodeDisabled: true,
                  editNodeDisabled: false,
                  delNodeDisabled: false,
                  values:ele.iapList[k]
                }
                promotionList.children.push(iap)
              }
            }
            obj.children.push(promotionList)
          }
          TreeData.push(obj)
        }
     }
      // this.submitData = TreeData
      this.treeData=new Tree(TreeData)
      console.log('TCL: handleNewPromoData -> TreeData', TreeData)
    },
    handleTreeChangeName(param){
      console.log("TCL: handleTreeChangeName -> param", param)
      if (param.oldName.indexOf('用户类型') > -1) {
        for(let k of this.treeData.children){
          if(k.name === param.newName){
            k.name = param.oldName
            return this.$message.info('该节点类型不能修改')
          }
        }
      } else {
        let flag=false
        for(let k of this.treeData.children){
          for(let n of k.children){
            if(n.name === param.newName){
              console.log("n",n)
              flag=true
              n.values.promMsg=param.newName
              this.treeReflectionChange({
                parent:n.parent.values,
                oldValues:n.values,
                newValues:{promMsg:param.newName}
              })
            }
          }
          if(!flag){
            for(let n of k.children){
              for(let o of n.children){
                if(o.name===param.newName){
                  flag=true
                  console.log('o',o)
                  o.values.promIapId=param.newName
                  this.treeReflectionChange({
                    parent:n.parent.values,
                    oldValues:n.values,
                    newValues:{promIapId:param.newName}
                  })
                }
              }
            }
          }
        }
      }
    },
    handleTreeAddNode(){},
    handleTreeDelNode(){},
    getBundleId(){
      this.bundleID=id
    },
    checkFormDisabled(keyName){
      let list=['id','promId','discountTypeId']
      if(list.includes(keyName)){
        return true
      }
      return false
    },
    getDefault(){},
    getConfigData(){},
    deletePromotion(){},
    saveItems(){},
    treeReflectionChange(info){
      console.log("TCL: treeReflectionChange -> info",info)

    }
  }
}
</script>
<style>
.promo{
  position: relative;
  line-height: 1.1;
}
.promo header{
  display: flex;
  align-items: center;
}
.promo header p{
  margin-right: 20px;
}
.promo h3{
  width: fit-content;
  margin: 0 auto;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.promo .btns{
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
}
.promo .btns .el-button{
  height: 40px;
}
.promo .btns .el-dropdown{
  margin-right: 10px;
}
.promo .configArea {
  width: 100%;
  padding-top: 20px;
  display: flex;
}
.promo .configArea .left{
  width: 45%;
  min-width: 230px;
  height: 100%;
  cursor: pointer;
}
.promo .configArea .right{
  flex:1;
}
.promo .configArea .el-card{
  height: auto;
  min-height: 300px;
  max-width: 500px;
}

</style>
