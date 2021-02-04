<template>
  <div class="base-table">
    <el-table
      v-loading="loading"
      :data="tableData"
      :style="tableSetting.tbstyle"
      :show-summary="tableSetting.isShowSum"
      :row-style="rowStyle"
      @row-dblclick="rowDbClick"
      @selection-change="handleSelectionChange"
      border
      stripe
      height="calc(100% - 58px)">
      <el-table-column
        v-if="tableSetting.checkBox"
        fixed
        align="center"
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column
        v-for="item in tableSetting.th"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :max-width="item.maxWidth"
        :formatter="item.formatter"
        :fixed="item.isfixed"
        :align="item.align"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        v-if="tableSetting.showOpera"
        :fixed="tableSetting.operaFixed?'right':'-'"
        align="center"
        label="操作"
        :width="50*tableSetting.operaSetting.length">
        <template slot-scope="scope">
          <el-button v-for="(item,index) in tableSetting.operaSetting" :key="index" :type="item.color" size="mini" circle @click="handleOperaFun(item.type, scope.$index, scope.row, tableSetting.tableData, index)">
            <i :class="[item.icon]"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tab-page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="tableSetting.pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/invoice-heads'
export default {
  name: 'base-table',
  props: {
    option: Object,
    httpurl: String
  },
  data () {
    return {
      tableSetting: this.option, // 表格设置
      rowStyleSet: this.option.rowStyle, // 特殊行
      tableData: [], // 表格数据
      tableTotal: 0, // 表格数据总数
      currentPage: 1, // 表格当前页
      pageSize: this.option.pageSize, // 一页显示多少数据
      params: this.option.httpData, // 请求参数
      loading: true // loading开关
    }
  },
  mounted () {
    this.tableAx(this.params, 'init')
  },
  methods: {
    handleSelectionChange (val) {
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
    rowDbClick (row, column, event) {
      this.$emit('dbRowClick', row)
    },
    initTable () {
      this.params = this.option.httpData
      this.currentPage = 1
      this.pageSize = this.option.pageSize
      this.tableAx(this.params, 'init')
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.tableAx(this.params, 'init')
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.tableAx(this.params, 'init')
    },
    searchTable (param) { // 确定高级查询
      let _this = this
      let httpPa = JSON.parse(JSON.stringify(_this.option.httpData))
      for (let v of Object.keys(param)) {
        httpPa[v] = param[v]
      }
      console.log(httpPa)
      _this.params = httpPa
      _this.currentPage = 1
      _this.tableAx(_this.params, '查询成功！')
    },
    async tableAx (param, type) {
      this.loading = true
      try {
        let data = await page(this.httpurl, {pageSize: this.pageSize, currentPage: this.currentPage}, param)
        this.tableData = data.data.rows
        this.tableTotal = data.data.total
        if (type === 'init') {
          console.log('初始化数据无需提示')
        } else {
          this.$message({
            message: type,
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
        this.$message({
          message: e,
          type: 'error'
        })
      } finally {
        this.loading = false
      }
    },
    rowStyle ({row, rowIndex}) { // 单元格样式
      if (this.rowStyleSet) {
        if (row[this.rowStyleSet.prop] === this.rowStyleSet.value) { //  && row.column.property === 'fplx'
          return {color: '#F56C6C', fontWeight: 'bold'}
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
  .tab-page
    background-color #fff
    padding 8px 10px
    margin-top 10px
</style>
