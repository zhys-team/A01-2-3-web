<template>
  <div class="certified-invoice">
    <!--税款操作栏-->
    <el-row class="operaBar">
      <el-col :span="12">
        <i class="el-icon-info operaInfo"></i>
        <span class="taxTitle">税款所属期：</span>
        <span class="taxMonth">
          <el-select v-model="csTaxMonth" placeholder="请选择税款所属期">
            <el-option
              v-for="item in taxMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </el-col>
      <el-col :span="12" class="opTbn">
        <!--<el-button type="primary" icon="el-icon-zoom-in" @click="openSenior">高级查询</el-button>-->
        <el-button type="success" icon="el-icon-upload" @click="certifiedPL">
          批量勾选申报
        </el-button>
        <el-button type="success" icon="el-icon-upload" @click="certifiedALL">
          历史全部申报
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
        <el-form-item label="开票日期">
          <el-date-picker
            :clearable="false"
            v-model="searchList.kprqArr"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            @change="kprqArrChange"
            start-placeholder="票据开始日期"
            end-placeholder="票据结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="销方名称">
          <el-input v-model="searchList.kpfmc" placeholder="请输入销方名称" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="税务类型">
          <el-radio-group v-model="searchList.fplx">
            <el-radio
              v-for="item in serviceTypeList"
              v-bind:key="item.val"
              :label="item.val"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
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
        </div>
      </el-form>
    </div>
    <!--表格插件-->
    <base-table
      class="baseTable"
      ref="baseTable"
      :httpurl="httpUrl"
      :option="tableSetting"
      @selectChange="handleSelectionChange"
    ></base-table>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  import countTable from '@/base/table/countTable'
  // import { updateRzState } from '@/api/invoice-heads'
  export default {
    name: 'Declaration',
    components: {
      BaseTable,
      countTable,
    },
    created() {
      this.getTaxMonth()
    },
    data() {
      return {
        options: this.$store.state.orgIdsOptions,
        httpUrl: this.$ihttp + '/invoiceHeads/page',
        tableSetting: {
          checkBox: true, // 是否有选择框  选择回调事件为selectChange
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
              prop: 'kprq',
              label: '票据日期',
              width: '130',
              isfixed: false,
            },
            {
              prop: 'name',
              label: '乘客姓名/销方名称',
              width: '180',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                if (row.name) {
                  result = row.name
                } else {
                  result = row.kpfmc
                }
                return result
              },
            },
            {
              prop: 'fplx',
              label: '出行类型',
              width: '170',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.fplx) {
                  case '10503':
                    result = '火车票'
                    break
                  case '10505':
                    result = '汽车票'
                    break
                  case '10506':
                    result = '飞机票'
                    break
                  case '10102':
                    result = '客运电子发票'
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
              width: '120',
              isfixed: false,
              formatter: (row, column) => {
                let result = ''
                switch (row.bxState) {
                  case '0':
                    result = '未核销'
                    break
                  case '1':
                    result = '已核销'
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
          httpData: { specialType: 'dl_kyfp', bxState: '1', rzState: '2' }, // 请求初始参数, spfsbh: '913300007420055726'
        },
        serviceTypeList: [
          { val: '', label: '全部' },
          { val: '10505', label: '汽车票' },
          { val: '10503', label: '火车票' },
          { val: '10506', label: '飞机票' },
          // {val: '10507', label: '过路过桥费'},
          { val: '10102', label: '客运类电子发票' },
          // {val: 'ywlx_jdcxstyfp', label: '通行费电子发票'}
        ],
        countTbSet: {
          showTitle: false,
          showList: [
            {
              fplx: 'ywlx_zzszyfp',
              sl: '0',
              dkwsje: '0.00',
              dkje: '0.00',
              kpje: '0.00',
            },
            {
              fplx: 'ywlx_txffp',
              sl: '0',
              dkwsje: '0.00',
              dkje: '0.00',
              kpje: '0.00',
            },
          ],
        },
        multipleSelection: [], // 勾选行集合
        invoiceMonth: '', // 开票月份
        taxMonth: [], // 税款所属期
        countVisible: false, // 统计弹窗的开关
        csTaxMonth: '', // 所选的税款所属期
        searchList: { orgId: null }, // 查询参数
        countlist: [],
        gxlist: [],
        taxNo: '913300007420055726', // 税号
      }
    },
    methods: {
      getTaxMonth() {
        let date = new Date()
        let Y = date.getFullYear()
        let prevM = date.getMonth()
        let M = date.getMonth() + 1
        let sM = '' + M
        let sprevM = '' + prevM
        if (M < 10) {
          sM = '0' + M
        }
        if (prevM < 10) {
          sprevM = '0' + prevM
        }
        let D = date.getDate()
        if (D > 15) {
          this.taxMonth.push({ value: Y + sM, label: Y + '年' + M + '月' })
          this.csTaxMonth = Y + sM
        } else {
          this.taxMonth.push({ value: Y + sM, label: Y + '年' + M + '月' })
          this.taxMonth.push({
            value: Y + sprevM,
            label: Y + '年' + prevM + '月',
          })
          this.csTaxMonth = Y + sM
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      invoiceMonthChange(val) {
        // 开票时间变化
        let date = new Date(val)
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let searchDateSatrt = Y + '-' + M + '-01'
        let searchDateEnd = Y + '-' + M + '-31'
        let param = {
          kprqStart: searchDateSatrt,
          kprqEnd: searchDateEnd,
        }
        this.$refs.baseTable.searchTable(param)
      },
      kprqArrChange(arr) {
        console.log(arr)
        this.searchList.kprqStart = arr[0]
        this.searchList.kprqEnd = arr[1]
      },
      certifiedPL() {
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
      certifiedALL() {
        this.$confirm('是否将历史数据进行全部申报处理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.sureAllSB()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消历史全部申报',
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
        this.invoiceMonth = new Date()
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
      async sureSB(ids) {
        // 批量申报
        let _this = this
        _this.loading = true
        _this.axios
          .get(
            _this.$ihttp +
              '/invoiceHeads/updateRzState?ids=' +
              ids +
              '&rz_state=3' +
              '&kjdkq=' +
              this.csTaxMonth
          )
          .then((res) => {
            console.log(res)
            if (res.data.data.success) {
              _this.loading = false
              _this.$refs.baseTable.initTable()
            } else {
              _this.loading = false
              this.$message({
                type: 'error',
                message: res.data.data.msg,
              })
            }
          })
          .catch((rev) => {
            console.log(rev)
            _this.loading = false
            this.$message({
              type: 'error',
              message: '批量申报失败！',
            })
          })
      },
      sureAllSB() {
        // 全部申报
        let _this = this
        _this.loading = true
        _this.axios
          .get(_this.$ihttp + '/invoiceHeads/updateRzState?rz_state=3')
          .then((res) => {
            console.log(res)
            if (res.data.data.success) {
              _this.loading = false
              _this.$refs.baseTable.initTable()
            } else {
              _this.loading = false
              this.$message({
                type: 'error',
                message: res.data.data.msg,
              })
            }
          })
          .catch((rev) => {
            console.log(rev)
            _this.loading = false
            this.$message({
              type: 'error',
              message: '历史全部申报失败！',
            })
          })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .taxMonth >>> .el-input__inner
    color #F44336
  .taxTitle
    color #333
  .operaInfo
    color #409EFF
  .certified-invoice
    height 100%
  .baseTable
    height calc(100% - 254px)
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
