<template>
  <div class="self_table">
    <el-row class="operaBar">
      <el-col :span="6" v-if="tableSetting.isSearch">
        <el-input :placeholder="tableSetting.isSearch.placeholder" v-model="searchVal" class="barSearch" @keydown.enter.native="tableSearch">
          <el-button slot="append" icon="el-icon-search" @click="tableSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addFather">添加目录</el-button>
        <el-tooltip class="item" effect="dark" content="重置刷新" placement="top-start">
          <el-button type="primary" plain icon="el-icon-refresh" @click="refreshTable"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--lazy-->
    <!--:load="loadChildren"-->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      height="calc(100% - 50px)"
      :default-expand-all='false'
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column v-for="item in tableSetting.th" :key="item.prop"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width"
                       :min-width="item.minwidth"
                       :formatter="item.formatter"
                       :fixed="item.isfixed"
                       :align="item.align"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column v-if="tableSetting.showOpera"
                       :fixed="tableSetting.operaFixed?'right':'-'"
                       align="center"
                       label="操作"
                       :width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新增子行项目" placement="top-end" v-if="tableSetting.operaList.add">
            <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addTr(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑行项目" placement="top" v-if="tableSetting.operaList.edit">
            <el-button type="success" size="mini" circle icon="el-icon-edit" @click="editTr(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除行及子行项目" placement="top-start" v-if="tableSetting.operaList.remove">
            <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="removeTr(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <detail-show :visible="detailVisible" :option="detailOption" :title="detailTitle" :type="detailType" :data="detailData" @handleClose="closeDetailr" @handleOpera="detailSure"></detail-show>
  </div>
</template>

<script>
import detailShow from './components/detailShow'
export default {
  name: 'tree-table',
  props: {
    option: Object
  },
  components: {detailShow},
  data () {
    return {
      loading: false,
      tableSetting: this.option,
      searchVal: '',
      tableData: [], // 展示数据
      params: this.option.httpData,
      zsArray: [], // 未改变之前的数据
      nsData: [], // 所有的数据数据
      detailVisible: false,
      detailOption: this.option.detailViews,
      detailTitle: '新增子行项目',
      detailType: 'add',
      detailData: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initTable()
    })
  },
  methods: {
    tableAx (param, sID, loadType, type) {
      let _this = this
      _this.loading = true
      _this.axios.post(_this.tableSetting.tableHttpUrl, param).then(
        res => {
          console.log(res.data.data)
          _this.zsArray = res.data.data
          _this.nsData = _this.sortData(_this.zsArray, sID, loadType)
          _this.tableData = _this.nsData
          _this.loading = false
          if (type === 'init') {
            console.log('初始化数据无需提示')
          } else {
            _this.$message({
              message: type,
              type: 'success'
            })
          }
        }).catch(rev => {
        _this.loading = false
        console.error(rev)
        _this.$message({
          message: '初始化数据失败！',
          type: 'error'
        })
      })
    },
    tableSearch () {
      let result = []
      if (this.searchVal === '') {
        result = this.nsData
      } else {
        result = this.nsData.filter(item => {
          return item[this.tableSetting.isSearch.searchProp] === this.searchVal
        })
        if (result.length === 0) {
          result = this.zsArray.filter(item => {
            return item[this.tableSetting.isSearch.searchProp] === this.searchVal
          })
        }
      }
      this.tableData = result
    },
    // loadChildren (tree, treeNode, resolve) {
    //   console.log(tree)
    //   console.log(treeNode)
    //   let res = this.sortData(this.zsArray, tree.id, this.tableSetting.loadType)
    //   setTimeout(() => {
    //     resolve(res)
    //   }, 100)
    // },&& item.code !== 'ycxm'
    sortData (arr) {
      let levelOne = arr.filter(item => {
        return item.parentId === 0
      })
      levelOne.forEach(item => {
        item['children'] = []
        arr.forEach(jitm => {
          if (jitm.parentId === item.id) {
            item['children'].push(jitm)
          }
        })
      })
      console.log(levelOne)
      return levelOne
    },
    // sortData1: (arr, sortID, type) => {
    //   let result = []
    //   if (type === 'ajsx') {
    //     arr.forEach((item, index) => {
    //       let a = JSON.parse(JSON.stringify(item))
    //       if (a.isLast === '1') {
    //         a['hasChildren'] = true
    //       }
    //       result.push(a)
    //     })
    //   } else {
    //     result = arr.filter((item, index) => {
    //       if (item.isLast === '1') {
    //         item['hasChildren'] = true
    //       }
    //       return item.parentId === sortID
    //     })
    //   }
    //   console.log(result)
    //   return result
    // },
    refreshTable () {
      this.params = this.option.httpData
      this.searchVal = ''
      this.tableAx(this.params, 0, this.tableSetting.loadType, '刷新成功！')
    },
    initTable () {
      this.params = this.option.httpData
      this.searchVal = ''
      this.tableAx(this.params, 0, this.tableSetting.loadType, 'init')
    },
    closeDetailr () {
      this.detailVisible = false
    },
    detailSure (param) {
      console.log('确定按钮')
      if (param.subtype === 'edit') {
        console.log('edit')
        this.$emit('handleEditTr', param)
      } else {
        console.log('add')
        this.$emit('handleAddTr', param)
      }
    },
    addFather () {
      let item = {
        parentId: 0
      }
      this.detailData = item
      this.detailTitle = '新增目录'
      this.detailType = 'add'
      this.detailVisible = true
    },
    addTr (row) {
      let item = {
        parentId: row.id,
        parentNo: row.no
      }
      this.detailData = item
      this.detailTitle = '新增子行项目'
      this.detailType = 'add'
      this.detailVisible = true
    },
    editTr (row) {
      this.detailData = row
      this.detailTitle = '编辑行项目'
      this.detailType = 'edit'
      this.detailVisible = true
    },
    removeTr (row) {
      this.$emit('handleRemoveTr', row)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .self_table
    height 100%
  .operaBar
    padding 0
    margin-bottom 10px
    width  100%
    .opTbn
      text-align right
  .tab-page
    background-color #fff
    padding 8px 10px
    margin-top 10px
</style>
