<template>
  <div class="doubtful-invoice">
    <!--操作栏-->
    <el-row class="operaBar">
      <el-col :span="6">
        <el-input
          placeholder="请输入 发票号码"
          v-model="searchVal"
          class="barSearch"
          @keydown.enter.native="tableSearch"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="tableSearch"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-button type="primary" icon="el-icon-zoom-in" @click="openSenior">
          高级查询
        </el-button>
        <el-button type="success" icon="el-icon-check" @click="allPass">
          批量放行
        </el-button>
        <el-button type="danger" icon="el-icon-close" @click="allBan">
          批量禁止
        </el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="allCancel">
          批量撤销
        </el-button>
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
    <doubtful-table
      class="doubtfulT"
      ref="doubtfulTable"
      :option="tableSetting"
      @selectChange="handleSelectionChange"
    ></doubtful-table>
    <!--高级搜索-->
    <senior-search
      :sivisible="sivisible"
      :option="seniorSearchSet"
      @handleClose="closeSenior"
      @handleSearch="seniorSearchSure"
    ></senior-search>
  </div>
</template>

<script>
  import doubtfulTable from '@/base/table/doubtfulTable'
  import seniorSearch from '@/base/table/seniorSearch'
  export default {
    name: 'Doubtful',
    components: { doubtfulTable, seniorSearch },
    data() {
      return {
        tableSetting: {
          checkBox: true, // 是否有选择框  选择回调事件为selectChange
          height: 'calc(100% - 58px)',
          checkBoxFixed: true, // 选择框列是否固定
          showOpera: true, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          tbstyle: 'width: 100%', // 列表的样式
          showPagination: true, // 是否显示分页
          currentPage: 1, // 当前页码
          pageSizes: [20, 50, 100], // 每页显示集合
          pageSize: 20, // 当前 每页显示数量
          total: 1, // 总数据
          th: [
            // 表哥表头设置
            {
              prop: 'fphm', // 字段名
              label: '发票号码', // 显示名称
              width: '120', // 宽度
              isfixed: false, // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'fpdm',
              label: '发票代码',
              width: '150',
              isfixed: false,
            },
            {
              prop: 'kprq',
              label: '开票日期',
              width: '120',
              isfixed: false,
            },
            {
              prop: 'kpje',
              label: '开票金额',
              width: '100',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.kpje) {
                  return '0.00'
                } else {
                  return row.kpje
                }
              },
            },
            {
              prop: 'state',
              label: '疑票状态',
              width: '120',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.state) {
                  case '0':
                    result = '未处理'
                    break
                  case '1':
                    result = '已放行'
                    break
                  case '2':
                    result = '已禁止'
                    break
                }
                return result
              },
            },
            {
              prop: 'reason',
              label: '疑票原因',
              maxWidth: '80',
              isfixed: false,
            },
            {
              prop: 'updateTime',
              label: '处理日期',
              width: '180',
              isfixed: false,
            },
            {
              prop: 'orgId',
              label: '组织',
              width: '100',
              isfixed: false,
            },
          ], // 表头设置参数
          httpData: {}, // 请求初始参数
        },
        searchVal: '',
        sivisible: false,
        seniorSearchSet: {
          // 高级筛选内容设置
          fphm: { placeholder: '请输入发票号码' },
          fpdm: { placeholder: '请输入发票代码' },
          createTime: { placeholder: '请选择收票日期', type: 'date' },
          ypState: [
            { lable: '全部', val: '' },
            { lable: '未处理', val: '0' },
            { lable: '已放行', val: '1' },
            { lable: '已禁止', val: '2' },
          ],
        },
        multipleSelection: [], // 勾选行集合
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      openSenior() {
        // 打开高级搜索
        this.sivisible = true
      },
      closeSenior() {
        // 关闭高级搜索
        this.sivisible = false
      },
      tableSearch() {
        let p = this.searchVal.replace(/\s*/g, '')
        let s = {}
        s['fphm'] = p
        this.$refs.doubtfulTable.searchTable(s)
      },
      seniorSearchSure(param) {
        // 确定高级查询
        let _this = this
        _this.searchVal = ''
        let httpPa = param
        console.log(httpPa)
        this.$refs.doubtfulTable.searchTable(httpPa)
      },
      allPass() {
        // 全部允许
        let arr1 = this.multipleSelection.filter((item) => item.state === '0')
        let arr = arr1.map((item) => item.id)
        console.log(arr)
        let param = arr.join(',')
        this.rowBatch(param, arr1, '1')
      },
      allBan() {
        // 全部禁止
        let arr1 = this.multipleSelection.filter((item) => item.state === '0')
        let arr = arr1.map((item) => item.id)
        console.log(arr)
        let param = arr.join(',')
        this.rowBatch(param, arr1, '2')
      },
      allCancel() {
        // 全部撤销
        let arr1 = this.multipleSelection.filter(
          (item) => item.state === '1' || item.state === '2'
        )
        let arr = arr1.map((item) => item.id)
        console.log(arr)
        let param = arr.join(',')
        this.rowBatch(param, arr1, '0')
      },
      rowBatch(param, arr, state) {
        // 批量放行 / 禁止 请求
        let _this = this
        _this.loading = true
        _this.axios
          .get(
            _this.$ihttp + '/invoiceDoubts/states/' + param + '?state=' + state
          )
          .then((res) => {
            // _this.$refs.doubtfulTable.updateRowByGroup(arr, state)
            _this.loading = false
            let msg = ''
            switch (state) {
              case '1':
                msg = '批量放行成功！'
                break
              case '2':
                msg = '批量禁止成功！'
                break
              case '0':
                msg = '批量撤回成功！'
                break
            }
            _this.$message({
              message: msg,
              type: 'success',
            })
            _this.$refs.doubtfulTable.closeLoad()
          })
          .catch((rev) => {
            _this.loading = false
            _this.$message({
              message: '批量操作失败',
              type: 'error',
            })
          })
      },
      refreshTable() {
        this.$refs.doubtfulTable.refreshTable()
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .doubtful-invoice
    height 100%
  .doubtfulT
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
