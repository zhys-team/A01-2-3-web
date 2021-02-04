<template>
  <div class="self_table">
    <el-row class="operaBar">
      <el-col :span="6" v-if="tableSetting.isSearch">
        <el-input :placeholder="tableSetting.isSearch.placeholder" v-model="searchVal" class="barSearch" @keydown.enter.native="tableSearch">
          <el-button slot="append" icon="el-icon-search" @click="tableSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-button type="primary" icon="el-icon-zoom-in" @click="openSenior">高级查询</el-button>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
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
      :row-style="rowStyle"
      @row-dblclick="rowDbClick"
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
        <!--<template slot-scope="scope" v-if="item.prop === 'fplx' && scope.row.isChange === '0'">-->
          <!--<span style="color:#F56C6C;font-weight: bold">{{ scope.row[item.prop] }}111</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column v-if="tableSetting.showOpera"
                       fixed="right"
                       align="center"
                       label="操作"
                       :width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" circle icon="el-icon-search" @click="watchImage(scope.row.pdfUrl)"></el-button>
          <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="removeInvoice(scope.row)"></el-button>
          <!--<el-button v-for="(item,index) in tableSetting.operaSetting" :key="index" :type="item.color" size="mini" circle @click="handleOperaFun(item.type, scope.$index, scope.row, tableSetting.tableData, index)">-->
            <!--<i :class="[item.icon]"></i>-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="tab-page" v-if="tableSetting.showPagination">
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
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[showUrl]"></el-image-viewer>
    <row-drawer :drawer="drawer" :option="rowOption" @handleClose="drawerClose"></row-drawer>
    <senior-search :sivisible="sivisible" :option="sioption" @handleClose="closeSenior" @handleSearch="seniorSearchSure"></senior-search>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import RowDrawer from './RowDrawer'
import seniorSearch from './seniorSearch'
export default {
  name: 'BaseTable',
  components: {
    ElImageViewer,
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
      showViewer: false, // 显示查看器
      showUrl: '', // 需要展示的图片Url
      drawer: false, // 显示发票详情开关
      rowOption: '', // 显示详情发票arr
      sivisible: false, // 显示高级查询弹窗开关
      sioption: this.option.seniorSearchSet // 高级选项弹窗设置
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.$emit('selectChange', val)
    },
    handleOperaFun (type, trIndex, row, data, opIndex) {
      let obj = {
        type: type,
        trIndex: trIndex,
        row: row,
        data: data,
        opIndex: opIndex
      }
      this.$emit('operaFun', obj)
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
    rowDbClick (row, column, event) {
      if (row.fplx === '10100' || row.fplx === '10101' || row.fplx === '10102' || row.fplx === '10103') {
        this.rowOption = row
        this.drawer = true
      } else {
        this.$message({
          message: '此票据无详情数据',
          type: 'info'
        })
      }
    },
    tableAx (param, pagenum, pagesize, type) {
      this.axios.post(this.$ihttp + '/invoiceHeads/page?pageSize=' + pagesize + '&pageNum=' + pagenum, param).then(
        res => {
          this.tableSetting.tableData = res.data.data.rows
          this.tableSetting.total = res.data.data.total
          this.loading = false
          if (type === 'init') {
            console.log('初始化数据无需提示')
          } else {
            this.$message({
              message: type,
              type: 'success'
            })
          }
        }).catch(rev => {
        this.loading = false
        this.$message({
          message: rev.data.message,
          type: 'error'
        })
      })
    },
    rowStyle (row) { // 单元格样式
      if (row.row.isChange === '0') { //  && row.column.property === 'fplx'
        return 'font-weight:bold;color:#F56C6C'
      } else {
        return ''
      }
    },
    tableSearch () {
      let p = this.searchVal.replace(/\s*/g, '')
      let s = JSON.parse(JSON.stringify(this.params))
      s['queryString1'] = p
      this.params = s
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '查询成功！')
    },
    watchImage (url) { // 开启查看器
      this.showUrl = url
      this.showViewer = true
    },
    closeViewer () { // 关闭查看器
      this.showViewer = false
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
    removeInvoice (row) { // 移除发票选项
      this.$confirm('是否删除发票号码：' + row.fphm + '发票代码：' + row.fpdm + '的发票？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '删除成功！')
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
