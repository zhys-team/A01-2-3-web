<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :style="tableSetting.tbstyle"
      @selection-change="handleSelectionChange"
      border
      stripe
      :height="tableSetting.height">
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
                       :max-width="item.maxWidth"
                       :formatter="item.formatter"
                       :fixed="item.isfixed"
                       :align="item.align"
                       show-overflow-tooltip>
        <!--<template slot-scope="scope" v-if="item.prop === 'fplx' && scope.row.isChange === '0'">-->
          <!--<span style="color:#F56C6C;font-weight: bold">{{ scope.row[item.prop] }}111</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column fixed="right"
                       align="right"
                       label="操作"
                       :width="140">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 0">
            <el-tooltip class="item" effect="dark" content="通过" placement="top-start">
              <el-button type="success" size="mini" circle icon="el-icon-check" @click="rowPass(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="禁止" placement="top-start">
              <el-button type="danger" size="mini" circle icon="el-icon-close" @click="rowBan(scope.row)"></el-button>
            </el-tooltip>
          </template>
          <el-tooltip v-if="scope.row.state == 1" class="item" effect="dark" content="撤销通过" placement="top-start">
            <el-button type="success" size="mini" circle icon="el-icon-refresh-left" @click="cancelOpera(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state == 2" class="item" effect="dark" content="撤销禁止" placement="top-start">
            <el-button type="danger" size="mini" circle icon="el-icon-refresh-left" @click="cancelOpera(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看影像" placement="top-start">
            <el-button type="primary" size="mini" circle icon="el-icon-search" @click="watchImage(scope.row.pdfUrl)"></el-button>
          </el-tooltip>
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
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import RowDrawer from './RowDrawer'
export default {
  name: 'doubtful_table',
  components: {
    ElImageViewer,
    RowDrawer
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
      tableData: [],
      params: this.option.httpData,
      loading: true,
      searchVal: '',
      showViewer: false, // 显示查看器
      showUrl: '' // 需要展示的图片Url
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
      this.axios.post(this.$ihttp + '/invoiceDoubts/page?pageSize=' + pagesize + '&pageNum=' + pagenum, param).then(
        res => {
          this.tableData = res.data.data.rows
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
    rowPass (row) { // 通过行
      this.rowSingle(row, '1')
    },
    rowBan (row) { // 通过行
      this.rowSingle(row, '2')
    },
    cancelOpera (row) { // 撤回通过、 撤回禁止
      this.rowSingle(row, '0')
    },
    watchImage (url) { // 开启查看器
      this.showUrl = this.$ihttp + url
      this.showViewer = true
    },
    closeViewer () { // 关闭查看器
      this.showViewer = false
    },
    rowSingle (row, state) { // 单个放行 / 禁止 / 撤销 请求 // state：1、放行 2、禁止 0、撤回
      let _this = this
      _this.loading = true
      _this.axios.get(_this.$ihttp + '/invoiceDoubts/state/' + row.id + '?state=' + state).then(
        res => {
          // _this.updateRow(row, state)
          _this.loading = false
          let msg = ''
          switch (state) {
            case '1':
              msg = '放行成功！'
              break
            case '2':
              msg = '禁止成功！'
              break
            case '0':
              msg = '撤回成功！'
              break
          }
          _this.closeLoad()
          _this.$message({
            message: msg,
            type: 'success'
          })
        }).catch(rev => {
        _this.loading = false
        _this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    },
    updateRow (row, state) { // 更新组状态
      let i = this.tableData.indexOf(row)
      this.tableData[i].state = state
    },
    updateRowByGroup (arr, state) { // 批量更新组状态
      arr.forEach(item => {
        this.updateRow(item, state)
      })
    },
    searchTable (param) { // 确定高级查询
      let _this = this
      let httpPa = JSON.parse(JSON.stringify(_this.option.httpData))
      for (let v of Object.keys(param)) {
        httpPa[v] = param[v]
      }
      console.log(httpPa)
      _this.params = httpPa
      _this.tableSetting.currentPage = 1
      _this.tableAx(_this.params, _this.tableSetting.currentPage, _this.tableSetting.pageSize, '查询成功！')
    },
    refreshTable () { // 刷新重置表格
      this.params = this.option.httpData
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, '刷新成功！')
    },
    closeLoad () {
      this.params = this.option.httpData
      this.tableSetting.currentPage = 1
      this.tableAx(this.params, this.tableSetting.currentPage, this.tableSetting.pageSize, 'init')
    },
    openLoad () {
      this.loading = true
    }
  }
}
</script>

<style lang="stylus" scoped>
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
