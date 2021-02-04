<template>
  <div class="ruleTable">
    <el-row class="operaBar">
      <el-col :span="6" v-if="tableSetting.isSearch">
        <el-input :placeholder="tableSetting.isSearch.placeholder" v-model="searchVal" class="barSearch" @keydown.enter.native="tableSearch">
          <el-button slot="append" icon="el-icon-search" @click="tableSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-button type="primary" icon="el-icon-zoom-in" @click="openSenior">高级查询</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addRoles">添加规则</el-button>
        <el-tooltip class="item" effect="dark" content="重置刷新" placement="top-start">
          <el-button type="primary" plain icon="el-icon-refresh" @click="refreshTable"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableSetting.tableData"
      :style="tableSetting.tbstyle"
      :show-summary="tableSetting.isShowSum"
      @selection-change="handleSelectionChange"
      border
      stripe
      height="calc(100% - 98px)">
      <el-table-column v-if="tableSetting.checkBox"
                       :fixed="tableSetting.checkBoxFixed"
                       align="center"
                       type="selection"
                       width="60">
      </el-table-column>
      <el-table-column v-for="item in tableSetting.th" :key="item.prop"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width"
                       :formatter="item.formatter"
                       :fixed="item.isfixed"
                       :align="item.align"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column v-if="tableSetting.showOpera"
                       :fixed="tableSetting.operaFixed?'right':'-'"
                       align="center"
                       label="操作"
                       :width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" circle icon="el-icon-edit" @click="editRoles(scope.row)"></el-button>
          <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="removeInvoice(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tab-page" v-if="tableSetting.showOpera">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableSetting.currentPage"
        :page-sizes="tableSetting.pageSizes"
        :page-size="tableSetting.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableSetting.total">
      </el-pagination>
    </div>
    <row-drawer :drawer="drawer" :formData="rowData" :drawerTitle="drawerTitle" @handleClose="drawerClose" @refTBSub="refreshTableSUB"></row-drawer>
    <senior-search :sivisible="sivisible" :option="sioption" @handleClose="closeSenior" @handleSearch="seniorSearchSure"></senior-search>
  </div>
</template>

<script>
import RowDrawer from './components/RowDrawer'
import seniorSearch from './components/seniorSearch'
export default {
  name: 'ruleTable',
  components: {
    RowDrawer,
    seniorSearch
  },
  props: {
    option: Object
  },
  mounted () {
    this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, 'init')
  },
  data () {
    return {
      tableSetting: this.option,
      params: this.option.httpData,
      loading: true,
      searchVal: '',
      showUrl: '', // 需要展示的图片Url
      drawer: false, // 显示底部弹窗开关
      rowData: {}, // 显示底部弹窗的顶部内容arr
      drawerTitle: '', // 底部弹窗的标题
      sivisible: false, // 显示高级查询弹窗开关
      sioption: this.option.seniorSearchSet // 高级选项弹窗设置
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.$emit('selectChange', val)
    },
    handleSizeChange (val) {
      this.loading = true
      console.log(`每页 ${val} 条`)
      this.tableSetting.pageSize = val
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, 'init')
    },
    handleCurrentChange (val) {
      this.loading = true
      console.log(`当前页: ${val}`)
      this.tableSetting.currentPage = val
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, 'init')
    },
    tableAx (param, pagenum, pagesize, type) {
      let _this = this
      _this.axios.post(_this.$ihttp + '/rule/page?pageSize=' + pagesize + '&pageNum=' + pagenum, param).then(
        res => {
          _this.tableSetting.tableData = res.data.data.rows
          _this.tableSetting.total = res.data.data.total
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
        console.log(rev)
        _this.loading = false
        _this.$message({
          message: '请求出错！',
          type: 'error'
        })
      })
    },
    tableSearch () {
      let p = this.searchVal.replace(/\s*/g, '')
      let s = JSON.parse(JSON.stringify(this.params))
      s['name'] = p
      this.params = s
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '查询成功！')
    },
    addRoles () { // 新增规则按钮
      this.drawerTitle = '新增规则'
      this.rowData = {}
      // this.rowData['editType'] = 'add'
      this.drawer = true
    },
    drawerClose () { // 关闭发票详情
      this.drawer = false
    },
    openSenior () { // 打开高级搜索
      this.sivisible = true
    },
    closeSenior () { // 关闭高级搜索
      this.sivisible = false
    },
    seniorSearchSure (param) { // 确定高级查询
      let _this = this
      _this.searchVal = ''
      let httpPa = param
      for (let v of Object.keys(_this.option.httpData)) {
        httpPa[v] = _this.option.httpData[v]
      }
      console.log(httpPa)
      _this.params = httpPa
      this.tableSetting.currentPage = 1
      _this.tableAx(_this.params, _this.tableSetting.currentPage, _this.tableSetting.pageSize, '查询成功！')
    },
    editRoles (row) { // 编辑规则
      console.log(row)
      let detail = JSON.parse(JSON.stringify(row))
      detail['editType'] = 'edit'
      this.rowData = detail
      this.drawerTitle = '编辑规则'
      this.drawer = true
    },
    removeInvoice (row) { // 移除规则
      this.$confirm('是否删除【' + row.name + '】的规则？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.axios.get(this.$ihttp + '/rule/changeDelStateById?id=' + row.id).then(
          res => {
            console.log(res)
            this.loading = false
            this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '删除成功！')
          }).catch(rev => {
          console.log(rev)
          this.loading = false
          this.$message({
            message: '请求出错！',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    refreshTable () { // 刷新重置表格
      this.params = this.option.httpData
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '重置表格成功！')
    },
    refreshTableSUB () { // 刷新重置表格通过提交
      this.params = this.option.httpData
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '提交修改成功！')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ruleTable
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
