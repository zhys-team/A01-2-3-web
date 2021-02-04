<template>
  <div class="treeObj">
    <el-row class="treeCon" :gutter="20">
      <el-col :span="12" class="conItem" v-loading="treeLoading">
        <div class="itemCon">
          <div>
            <el-input class="treeSearch" :placeholder="treeSetting.isSearch.placeholder" v-model="searchVal" @keydown.enter.native="treeSearch">
              <el-button slot="append" icon="el-icon-search" @click="treeSearch"></el-button>
            </el-input>
            <div class="reftreeSearch">
              <el-tooltip class="item" effect="dark" content="重置刷新" placement="top-start">
                <el-button type="primary" plain icon="el-icon-refresh" @click="treeRefrsh"></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="treeM">
            <el-tree
              ref="selfTree"
              :highlight-current='true'
              :data="treeData"
              :props="treeSetting.props"
              :load="loadNode"
              lazy
              @node-click="nodeClick"
              :accordion="treeSetting.accordion">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="conItem" v-loading="itemLoading">
        <div class="itemCon">
          <div class="itemDetail">
            <el-form :model="subForm" label-width="100px">
              <el-form-item v-for="item in treeSetting.detailViews.input" v-bind:key="item.label" :label="item.label">
                <el-input v-model="subForm[item.pro]" :placeholder="item.placeholder" :disabled="item.disabled" class="detailInput" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item v-for="item in treeSetting.detailViews.cascader" v-bind:key="item.label" :label="item.label">
                <el-cascader v-model="subForm[item.pro]" :options="item.options" class="detailCascader" style="width: 300px"></el-cascader>
              </el-form-item>
              <el-form-item v-for="item in treeSetting.detailViews.radio" v-bind:key="item.label" :label="item.label">
                <el-radio-group v-model="subForm[item.pro]">
                  <el-radio v-for="radioitem in item.options" v-bind:key="radioitem.label" :label="radioitem.label" class="detailRadio">{{radioitem.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="itemFt">
            <el-button class="ftBtn" type="primary" icon="el-icon-edit" @click="sureEdit">修 改</el-button>
            <el-button class="ftBtn" type="success" icon="el-icon-circle-plus-outline" @click="nodeAdd">新 增</el-button>
            <el-button class="ftBtn" type="danger" icon="el-icon-delete" @click="nodeRemove">删 除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="新增"
      :visible.sync="addVisible"
      width="460px">
      <el-form ref="addForm" :rules="addrule" :model="addForm" label-width="110px">
        <el-form-item v-for="item in treeSetting.detailViews.input" v-bind:key="item.label" :label="item.label" :prop="item.pro">
          <el-input v-model="addForm[item.pro]" :placeholder="item.placeholder" class="detailInput" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item v-for="item in treeSetting.detailViews.cascader" v-bind:key="item.label" :label="item.label" :prop="item.pro">
          <el-cascader v-model="addForm[item.pro]" :options="item.options" class="detailCascader" style="width: 300px"></el-cascader>
        </el-form-item>
        <el-form-item v-for="item in treeSetting.detailViews.radio" v-bind:key="item.label" :label="item.label" :prop="item.pro">
          <el-radio-group v-model="addForm[item.pro]">
            <el-radio v-for="radioitem in item.options" v-bind:key="radioitem.label" :label="radioitem.label" class="detailRadio">{{radioitem.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否最外层">
          <el-radio-group v-model="isFatherSet" @change="fatherSetChange">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父节点ID">
          <el-input v-model="addParentId" placeholder="请输入父节点ID" class="detailInput" style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="refAdd">重 置</el-button>
      <el-button type="primary" @click="sureAdd">添 加</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tree-obj',
  props: ['options', 'itemData'],
  watch: {
    itemData: {
      handler (val, oldVal) {
        this.subForm = val
      },
      deep: true
    }
  },
  data () {
    return {
      treeSetting: this.options,
      treehttpParams: this.options.treehttpParams,
      sbKey: this.options.sbKey,
      searchVal: '',
      treeData: [],
      subForm: this.itemData,
      treeLoading: false, // 树型load
      itemLoading: false, // 子项load
      addVisible: false, // 添加节点弹窗开关
      addForm: {}, // 添加提交的form
      addrule: this.options.addRule,
      isFatherSet: '0', // 是否最外层
      operaParentId: 0, // 添加的parentID
      addParentId: '0' // s
    }
  },
  methods: {
    loadNode (node, resolve) {
      let _this = this
      _this.treeLoading = true
      let Skey = _this.sbKey
      let reqParams = JSON.parse(JSON.stringify(_this.treehttpParams))
      if (node.level === 0) {
        reqParams[Skey] = 0
      } else {
        reqParams[Skey] = node.data.id
      }
      _this.axios.post(_this.treeSetting.treehttpUrl, reqParams).then(
        res => {
          let arr = res.data
          if (arr.data && arr.data.length > 0) {
            _this.treeLoading = false
            return resolve(arr.data)
          } else {
            _this.treeLoading = false
            return resolve([])
          }
        }).catch(rev => {
        console.error(rev)
        _this.$message({
          message: '请求失败！',
          type: 'error'
        })
        _this.treeLoading = false
        return resolve([])
      })
    },
    treeSearch () {
      let _this = this
      console.log(this.searchVal)
      let p = _this.searchVal.replace(/\s*/g, '')
      let s = JSON.parse(JSON.stringify(_this.treehttpParams))
      s[this.treeSetting.isSearch.name] = p
      if (p === '') {
        s[_this.sbKey] = 0
      }
      _this.axios.post(_this.treeSetting.treehttpUrl, s).then(
        res => {
          let arr = res.data
          if (arr.data && arr.data.length > 0) {
            _this.treeLoading = false
            _this.treeData = arr.data
          } else {
            _this.treeLoading = false
            _this.treeData = []
          }
        }).catch(rev => {
        console.error(rev)
        _this.$message({
          message: '请求失败！',
          type: 'error'
        })
        _this.treeLoading = false
        return false
      })
    },
    treeRefrsh () { // 刷新树
      this.searchVal = ''
      this.treeSearch()
    },
    nodeClick (data, node, e) {
      this.addParentId = data.id
      this.operaParentId = data.id
      this.itemLoading = true
      this.$emit('handleNodeClick', data, node)
    },
    itemLoadClose () {
      this.itemLoading = false
    },
    nodeAdd () { // 节点添加
      this.addVisible = true
      if (this.operaParentId) {
        this.isFatherSet = '1'
      } else {
        this.isFatherSet = '0'
        this.addParentId = 0
      }
    },
    refreshEd () { // 还原修改
      console.log('还原')
    },
    sureEdit () { // 修改
      this.$emit('handleNodeEdit', this.subForm)
    },
    refAdd () { // 重置添加表单
      this.addForm = {}
    },
    sureAdd () { // 确定新增按钮
      let param = JSON.parse(JSON.stringify(this.addForm))
      param['parentId'] = this.addParentId
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$emit('handleNodeAdd', param)
          this.addVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fatherSetChange (val) { // 新增弹窗是否最外层
      if (val === '1') {
        this.addParentId = this.operaParentId
      } else {
        this.addParentId = 0
      }
    },
    nodeRemove () {
      if (!this.operaParentId) {
        this.$message({
          message: '请先选择一条数据！',
          type: 'info'
        })
        return false
      } else {
        this.$emit('handleNodeRemove', this.subForm)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.treeM >>> .el-tree-node__content
  height 40px
.treeM >>> .el-tree-node__label
  font-size 16px
  background #409eff
  padding 5px 10px
  color #fff
  border-radius 4px
.treeM >>> .is-current > .el-tree-node__content > .el-tree-node__label
  background #67C23A
.treeObj
  height 100%
  .treeCon
    height 100%
    .conItem
      height:100%
      .itemCon
        height:calc(100% - 40px)
        background-color #fff
        padding 20px 10px
        .reftreeSearch
          display inline-block
          float right
        .treeSearch
          margin-bottom 10px
          width calc(100% - 150px)
        .treeM
          height calc(100% - 50px)
          max-height calc(100% - 50px)
          overflow auto
        .itemDetail
          height calc(100% - 150px)
          max-height calc(100% - 150px)
          overflow auto
        .itemFt
          height 40px
          .ftBtn
            width calc(100% - 40px)
            margin 10px 20px 0 20px
</style>
