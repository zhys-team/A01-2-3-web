<template>
  <div class="certified-invoice">
    <!--税款查询操作栏-->
    <div class="taxSearch">
      <el-form :inline="true" :model="searchList">
        <el-form-item label="发票号码">
          <el-input
            v-model="searchList.fphm"
            placeholder="请输入发票号码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input
            v-model="searchList.fpdm"
            placeholder="请输入发票代码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="台账类型">
          <el-select
            v-model="searchList.specialType"
            clearable
            placeholder="请选择台账类型"
          >
            <el-option
              v-for="item in specialTypeList"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select
            v-model="searchList.fplx"
            clearable
            placeholder="请选择发票类型"
          >
            <el-option
              v-for="item in fplxList"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select
            v-model="searchList.rzState"
            clearable
            placeholder="请选择认证状态"
          >
            <el-option label="初始状态" value="1"></el-option>
            <el-option label="待认证" value="2"></el-option>
            <el-option label="认证中" value="2.5"></el-option>
            <el-option label="已认证" value="3"></el-option>
            <el-option label="撤销中" value="3.5"></el-option>
            <el-option label="已转出" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-date-picker
            v-model="searchList.kprqArr"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            @change="kprqArrChange"
            start-placeholder="票据开始日期"
            end-placeholder="票据结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="会计抵扣期">
          <el-date-picker
            v-model="kjdkqQ"
            type="month"
            value-format="yyyy-MM"
            @change="kjdkqChange"
            placeholder="开票开始日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="核销日期">
          <el-date-picker
            v-model="searchList.rzrqArr"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            @change="rzrqArrChange"
            start-placeholder="核销开始日期"
            end-placeholder="核销结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="核销状态">
          <el-select
            v-model="searchList.bxState"
            clearable
            placeholder="请选择核销状态"
          >
            <el-option label="未核销" value="0"></el-option>
            <el-option label="进行核销或核销完毕" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在组织" prop="orgId">
          <el-select v-model="searchList.orgId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="searchBtn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button
            type="success"
            icon="el-icon-upload"
            @click="_exportInvoice"
            style="float: right"
          >
            筛选导出
          </el-button>
          <!-- <el-button type="success" icon="el-icon-upload" @click="_exportInvoiceAll" style="float:right">全部导出</el-button> -->
        </div>
      </el-form>
    </div>
    <!--表格插件-->
    <base-table
      class="baseTable"
      ref="baseTable"
      :httpurl="httpUrl"
      :option="tableSetting"
    ></base-table>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  import countTable from '@/base/table/countTable'
  import { exportInvoice, exportInvoiceAll } from '@/api/invoice-heads'
  export default {
    name: 'InputSummaryExport',
    components: {
      BaseTable,
      countTable,
    },
    data() {
      return {
        httpUrl: this.$ihttp + '/invoiceHeads/page',
        tableSetting: {
          checkBox: false, // 是否有选择框  选择回调事件为selectChange
          showOpera: false, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          operaSetting: [],
          // rowStyle: {prop: 'isChange', value: '0', style: 'font-weight:bold;color:#F56C6C'}, // 设置特殊行
          tbstyle: 'width: 100%', // 列表的样式
          pageSize: 50, // 初始每页显示数据量
          pageSizes: [20, 50, 100], // 每页显示集合
          th: [
            // 表哥表头设置
            {
              prop: 'fphm', // 字段名
              label: '发票号码', // 显示名称
              width: '150', // 宽度
              isfixed: false, // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'fpdm',
              label: '发票代码',
              width: '200',
              isfixed: false,
            },
            {
              prop: 'reimburseNo',
              label: '报销单号',
              width: '200',
              isfixed: false,
            },
            {
              prop: 'rzrq',
              label: '核销日期',
              width: '150',
              isfixed: false,
            },
            {
              prop: 'ywsx',
              label: '费用大类',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'mxsx',
              label: '费用小类',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'kprq',
              label: '开票日期',
              width: '130',
              isfixed: false,
            },
            {
              prop: 'fplx',
              label: '发票类型',
              width: '170',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.fplx) {
                  case '10100':
                    result = '专用发票'
                    break
                  case '10101':
                    result = '普通发票'
                    break
                  case '10102':
                    result = '电子发票'
                    break
                  case '10103':
                    result = '卷票普票'
                    break
                  case '10500':
                    result = '出租车发票'
                    break
                  case '10503':
                    result = '火车票'
                    break
                  case '10505':
                    result = '汽车票'
                    break
                  case '10506':
                    result = '飞机票'
                    break
                  case '10507':
                    result = '过路过桥费'
                    break
                  case '10200':
                    result = '定额发票'
                    break
                  case '10104':
                    result = '机动车销售发票'
                    break
                  case '10105':
                    result = '二手车销售发票'
                    break
                  case '20100':
                    result = '商业小票'
                    break
                }
                return result
              },
            },
            // {
            //   prop: 'hjje',
            //   label: '金额',
            //   maxWidth: '120',
            //   isfixed: false,
            //   align: 'right',
            //   formatter: (row, column) => {
            //     if (!row.hjje) {
            //       return '0.00'
            //     } else {
            //       return row.hjje
            //     }
            //   }
            // },
            {
              prop: 'dkje',
              label: '抵扣金额',
              maxWidth: '120',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.dkje) {
                  return '0.00'
                } else {
                  return row.dkje
                }
              },
            },
            {
              prop: 'kpje',
              label: '开票金额',
              width: '150',
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
              prop: 'createTime',
              label: '收票日期',
              width: '150',
              isfixed: false,
            },
            {
              prop: 'bxState',
              label: '核销状态',
              width: '100',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.bxState) {
                  case '0':
                    result = '未核销'
                    break
                  case '1':
                    result = '进行核销或核销完毕'
                    break
                }
                return result
              },
            },
            {
              prop: 'rzState',
              label: '认证状态',
              width: '80',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.rzState) {
                  case '1':
                    result = '初始状态'
                    break
                  case '2':
                    result = '待认证'
                    break
                  case '2.5':
                    result = '认证中'
                    break
                  case '3':
                    result = '已认证'
                    break
                  case '3.5':
                    result = '撤销中'
                    break
                  case '4':
                    result = '已转出'
                    break
                }
                return result
              },
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
        specialTypeList: [
          { val: 'dl_zptz', label: '专票台账' },
          { val: 'dl_kyfp', label: '客运台账' },
          { val: 'dl_zzsfp', label: '费用台账' },
          { val: 'dl_jdcxsfp', label: '机动车台账' },
          { val: 'specialType', label: '费用台账' },
          { val: 'dl_hytz', label: '货运台账' },
        ],
        fplxList: [
          { val: '10100', label: '专用发票' },
          { val: '10101', label: '普通发票' },
          { val: '10102', label: '电子发票' },
          { val: '10103', label: '卷票普票' },
          { val: '10500', label: '出租车发票' },
          { val: '10503', label: '火车票' },
          { val: '10505', label: '汽车票' },
          { val: '10506', label: '飞机票' },
          { val: '10507', label: '过路过桥费' },
          { val: '10200', label: '定额发票' },
          { val: '10104', label: '机动车销售发票' },
          { val: '10105', label: '二手车销售发票' },
          { val: '20100', label: '商业小票' },
        ],
        kjdkqQ: '', // 会计抵扣期
        countVisible: false, // 统计弹窗的开关
        csTaxMonth: '', // 所选的税款所属期
        searchList: {
          orgId: null,
        }, // 查询参数
        options: this.$store.state.orgIdsOptions,
      }
    },
    methods: {
      kprqArrChange(arr) {
        if (arr && arr.length > 0) {
          this.searchList.kprqStart = arr[0]
          this.searchList.kprqEnd = arr[1]
        } else {
          this.searchList.kprqStart = ''
          this.searchList.kprqEnd = ''
        }
      },
      rzrqArrChange(arr) {
        if (arr && arr.length > 0) {
          this.searchList.rzrqStart = arr[0]
          this.searchList.rzrqEnd = arr[1]
        } else {
          this.searchList.rzrqStart = ''
          this.searchList.rzrqEnd = ''
        }
      },
      kjdkqChange(val) {
        if (val) {
          let arr = val.split('-')
          this.searchList.kjdkq = arr[0] + arr[1]
        } else {
          this.searchList.kjdkq = ''
        }
      },
      turnOff() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请填选择发票！',
            type: 'warning',
          })
          return
        }
        this.$confirm('是否将勾选数据进行申报处理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            let ids = this.plSBOpera(this.multipleSelection)
            this.sureSB(ids)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消批量申报',
            })
          })
      },
      plSBOpera() {
        let arr = this.multipleSelection.map((item) => {
          return "'" + item.id + "'"
        })
        return arr.join(',')
      },
      refreshTable() {
        // 刷新重置表格
        this.$refs.baseTable.initTable()
      },
      resetForm() {
        // 重置表单并刷新表格
        this.searchList = {}
        this.$refs.baseTable.initTable()
      },
      onSubmit() {
        // 确定查询
        console.log(this.searchList)
        this.$refs.baseTable.searchTable(this.searchList)
      },
      async _exportInvoice() {
        // 筛选导出
        const loading = this.$loading({
          lock: true,
          text: '正在导出中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        try {
          let data = await exportInvoice(this.searchList)
          console.log(data)
          this.$message({
            type: 'success',
            message: '筛选导出成功！',
          })
        } catch (error) {
          console.log(error)
        } finally {
          loading.close()
        }
      },
      async _exportInvoiceAll() {
        this.loading = true
        try {
          let data = await exportInvoiceAll(this.searchList)
          console.log(data)
          this.$message({
            type: 'success',
            message: '筛选导出成功！',
          })
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .taxTitle
    color #333
  .operaInfo
    color #409EFF
  .certified-invoice
    height 100%
  .baseTable
    height calc(100% - 266px)
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
  .taxSearch
    background-color #fff
    padding 15px
    margin-bottom 10px
    border-radius 5px
  .searchBtn
    display block
</style>
