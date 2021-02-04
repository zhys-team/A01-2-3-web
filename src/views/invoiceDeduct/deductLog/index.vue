<template>
  <div class="check-log">
    <!--操作栏-->
    <el-row class="operaBar" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入发票号码"
          v-model="searchVal"
          class="barSearch"
          @keydown.enter.native="tableSearchByVal"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="tableSearchByVal"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="rzDate"
          type="month"
          value-format="yyyy-MM"
          @change="tableSearch"
          placeholder="当前所属期"
        ></el-date-picker>
      </el-col>
      <el-col :span="12" class="opTbn">
        <el-tooltip
          class="item"
          effect="dark"
          content="重置刷新"
          placement="top-start"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh"
            @click="refreshTable"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--表格插件-->
    <base-table
      class="baseTable"
      ref="baseTable"
      :option="tableSetting"
      :httpurl="httpUrl"
      @operaFun="handleOpera"
    ></base-table>
    <!-- 表格明细 -->
    <el-dialog title="明细" :visible.sync="dialogVisible" width="740px">
      <span>
        <el-table :data="deatilData" style="width: 100%">
          <el-table-column
            prop="invoiceCode"
            label="发票代码"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="invoiceNumber"
            label="发票号码"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="validTax"
            :formatter="getValidTax"
            width="120"
            label="认证税额"
          ></el-table-column>
          <el-table-column
            prop="state"
            :formatter="getState"
            width="100"
            label="状态"
          ></el-table-column>
          <el-table-column
            prop="exportRejectNo"
            width="200"
            label="原因"
          ></el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  export default {
    name: 'DeductLog',
    components: { BaseTable },
    data() {
      return {
        httpUrl: this.$ihttp + '/invoiceHeads/DeductPages', // 请求路径
        tableSetting: {
          checkBox: false,
          isSearch: {
            searchProp: 'queryString1',
            placeholder: '请输入 发票代码/发票号码',
          }, // 搜索框字段设置。
          operaFixed: true, // 是否固定操作列（编辑、删除）
          showOpera: false, // 是否有操作列（编辑、删除）
          operaSetting: [],
          tbstyle: 'width: 100%', // 列表的样式
          showPagination: true, // 是否显示分页
          currentPage: 1, // 当前页码
          pageSizes: [20, 50, 100], // 每页显示集合
          pageSize: 20, // 当前 每页显示数量
          total: 1, // 总数据
          th: [
            // 表哥表头设置
            {
              prop: 'invoiceCode',
              label: '发票代码',
              width: '150',
              align: 'left',
            },
            {
              prop: 'invoiceNumber',
              label: '发票号码',
              width: '150',
              align: 'left',
            },
            {
              prop: 'deductType',
              label: '勾选类型',
              width: '100',
              formatter: (row, column) => {
                let result = ''
                switch (row.deductType) {
                  case '1':
                    result = '抵扣'
                    break
                  case '2':
                    result = '退税'
                    break
                  case '3':
                    result = '代办退税'
                    break
                  case '4':
                    result = '不抵扣'
                    break
                  case '6':
                    result = '撤销抵扣'
                    break
                  case '7':
                    result = '撤销不抵扣'
                    break
                }
                return result
              },
            },
            {
              prop: 'createTime',
              label: '勾选日期',
              width: '150',
              formatter: (row, column) => {
                let date = new Date(row.createTime)
                let Y = date.getFullYear() + '-'
                let M =
                  (date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1) + '-'
                let D = date.getDate() + ' '
                return Y + M + D
              },
            },
            {
              prop: 'period',
              label: '当前所属期',
              width: '100',
              align: 'left',
            },
            {
              prop: 'state',
              label: '状态',
              width: '150',
              isfixed: false,
              formatter: (row, column) => {
                let result = ''
                switch (row.state) {
                  case '0':
                    result = '未勾选'
                    break
                  case '1':
                    result = '已勾选'
                    break
                }
                return result
              },
            },
            {
              prop: 'exportRejectNo',
              label: '原因',
              maxWidth: '200',
              align: 'left',
            },
          ], // 表头设置参数
          tableData: [],
          httpData: {}, // 请求初始参数
        },
        rzDate: '',
        dialogVisible: false,
        searchVal: '', // 搜索内容
        deatilData: [], // 明细内容
      }
    },
    methods: {
      tableSearch(val) {
        if (val) {
          let sjc = val.split('-')
          let s = {
            period: sjc[0] + sjc[1],
          }
          this.$refs.baseTable.searchTable(s)
        } else {
          this.$refs.baseTable.initTable()
        }
      },
      tableSearchByVal() {
        // 通过发票号码查询
        let p = this.searchVal.replace(/\s*/g, '')
        let s = {
          invoiceNumber: p,
        }
        this.$refs.baseTable.searchTable(s)
      },
      refreshTable() {
        // 刷新重置表格
        this.$refs.baseTable.initTable()
      },
      getState(row, column) {
        let result = ''
        switch (row.state) {
          case '0':
            result = '未勾选'
            break
          case '1':
            result = '已勾选'
            break
        }
        return result
      },
      getValidTax(row) {
        let result = ''
        if (row.validTax) {
          result = row.validTax
        } else {
          result = '无'
        }
        return result
      },
      handleOpera(obj) {
        // 其他行操作按钮接口暂时不用自定义
        console.log(obj.row)
        this.deatilData = obj.row.invoices
        this.dialogVisible = true
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .check-log
    height 100%
  .baseTable
    height calc(100% - 50px)
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
