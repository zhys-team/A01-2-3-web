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
        <el-button
          v-show="gxShow == '2'"
          type="success"
          icon="el-icon-finished"
          @click="certifiedIV"
        >
          勾选提交
        </el-button>
        <el-button
          v-show="gxShow == '3'"
          type="primary"
          icon="el-icon-refresh-left"
          @click="cxGx"
        >
          撤销提交
        </el-button>
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
            v-model="searchList.kprqArr"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            @change="kprqArrChange"
            start-placeholder="开票开始日期"
            end-placeholder="开票结束日期"
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
        <el-form-item label="销方名称">
          <el-input
            v-model="searchList.kpfmc"
            placeholder="请输入销方名称"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="税务类型">
          <el-radio-group v-model="searchList.fplx">
            <el-radio v-for="item in serviceTypeList" v-bind:key="item.val" :label="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="认证状态">
          <el-radio-group v-model="searchList.rzState">
            <el-radio
              @change="rzStateChange"
              v-for="item in rzStatelist"
              v-bind:key="item.val"
              :label="item.val"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在组织" prop="orgId" style="margin-left: 20px">
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
    <!-- 统计数据弹窗 -->
    <el-dialog
      :title="'税款所属期：' + csTaxMonth + ' 的认证统计数据'"
      :visible.sync="countVisible"
      width="70%"
    >
      <span>
        <count-table
          :header-set="countTbSet"
          class="countTable"
          ref="countTable"
        ></count-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="countVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sureGx"
          :disabled="btnLoading"
          :loading="btnLoading"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  import countTable from '@/base/table/countTable'
  import { invoicesGX, invoicesCancelGX } from '@/api/invoice-heads'
  export default {
    name: 'CheckCertification',
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
              label: '开票日期',
              width: '130',
              isfixed: false,
            },
            {
              prop: 'kpfmc',
              label: '销方名称',
              maxWidth: '260',
              isfixed: false,
            },
            {
              prop: 'hjje',
              label: '金额',
              width: '120',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.hjje) {
                  return '0.00'
                } else {
                  return row.hjje
                }
              },
            },
            {
              prop: 'hjse',
              label: '税额',
              width: '120',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.hjse) {
                  return '0.00'
                } else {
                  return row.hjse
                }
              },
            },
            {
              prop: 'kpje',
              label: '价税合计',
              width: '120',
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
              prop: 'rzState',
              label: '认证状态',
              width: '120',
              isfixed: false,
              formatter: (row, column) => {
                let result = ''
                switch (row.rzState) {
                  case '2':
                    result = '未认证'
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
                }
                return result
              },
            },
            {
              prop: 'kjdkq',
              label: '会计抵扣期',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'createTime',
              label: '收票日期',
              width: '120',
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
          httpData: {
            specialType: 'dl_zptz',
            bxState: '1',
            rzState: '2',
            spfsbh: '913300007420055726',
          }, // 请求初始参数
        },
        serviceTypeList: [
          { val: '', label: '全部' },
          { val: '10100', label: '增值税专用发票' },
          // {val: '10107', label: '通行费电子发票'}
          // {val: '', label: '专用电子发票'}
          // {val: 'ywlx_jdcxstyfp', label: '通行费电子发票'}
        ],
        rzStatelist: [
          // {val: '', label: '全部'},
          { val: '2', label: '未认证' },
          { val: '2.5', label: '认证中' },
          { val: '3', label: '已认证' },
          { val: '3.5', label: '撤销中' },
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
            // {fplx: 'ywlx_txffp', sl: '0', dkwsje: '0.00', dkje: '0.00', kpje: '0.00'}
          ],
        },
        btnLoading: false, // 确认按钮loading
        kjdkqQ: '', // 会计抵扣期
        multipleSelection: [], // 勾选行集合
        invoiceMonth: '', // 开票月份
        taxMonth: [], // 税款所属期
        countVisible: false, // 统计弹窗的开关
        csTaxMonth: '', // 所选的税款所属期
        searchList: { rzState: '2', orgId: null }, // 查询参数
        countlist: [],
        gxlist: [],
        gxShow: '2', // 是否展示勾选发票
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
          this.taxMonth.push({
            value: Y + sprevM,
            label: Y + '年' + prevM + '月',
          })
          this.taxMonth.push({ value: Y + sM, label: Y + '年' + M + '月' })
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
        if (arr && arr.length > 0) {
          this.searchList.kprqStart = arr[0]
          this.searchList.kprqEnd = arr[1]
        } else {
          this.searchList.kprqStart = ''
          this.searchList.kprqEnd = ''
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
      rzStateChange(val) {
        console.log(val)
      },
      certifiedIV(type) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请填选择发票！',
            type: 'warning',
          })
          return
        }
        this.countVisible = true
        this.$nextTick(() => {
          this.gxlist = this.gxInvoiceOpera(this.multipleSelection)
          this.$refs.countTable.setTableData(this.countlist)
        })
      },
      gxInvoiceOpera(invs) {
        let zyfpItem = {
          fplx: 'ywlx_zzszyfp',
          sl: 0,
          kpje: 0,
          dkje: 0,
          dkwsje: 0,
        }
        let txffpItem = {
          fplx: 'ywlx_txffp',
          sl: 0,
          kpje: 0,
          dkje: 0,
          dkwsje: 0,
        }
        let result = invs.map((item) => {
          let newItem = {
            invoiceCode: item.fpdm,
            invoiceNumber: item.fphm,
          }
          if (item.fplx === '10100') {
            newItem['fplx'] = 'ywlx_zzszyfp'
            newItem['validTax'] = item.dkje
            zyfpItem['sl']++
            zyfpItem['kpje'] += this.isNullCheck(item.kpje)
            zyfpItem['dkje'] += this.isNullCheck(item.dkje)
            zyfpItem['dkwsje'] += this.isNullCheck(item.dkwsje)
          } else if (item.fplx === '10107') {
            newItem['fplx'] = 'ywlx_txffp'
            newItem['validTax'] = item.dkje
            txffpItem['sl']++
            txffpItem['kpje'] += this.isNullCheck(item.kpje)
            txffpItem['dkje'] += this.isNullCheck(item.dkje)
            txffpItem['dkwsje'] += this.isNullCheck(item.dkwsje)
          }
          return newItem
        })
        this.countlist = [zyfpItem, txffpItem]
        return result
      },
      refreshTable() {
        // 刷新重置表格
        this.invoiceMonth = new Date()
        this.$refs.baseTable.initTable()
      },
      resetForm() {
        // 重置表单并刷新表格
        this.searchList = { rzState: '2' }
        this.$refs.baseTable.initTable()
      },
      onSubmit() {
        // 确定查询
        console.log(this.searchList)
        this.$refs.baseTable.searchTable(this.searchList)
        // eslint-disable-next-line eqeqeq
        this.gxShow = this.searchList.rzState // 是否显示勾选
      },
      async cxGx() {
        await this.$confirm('是否将该发票进行撤销认证?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        try {
          this.loading = true
          this.btnLoading = true
          let list = this.gxInvoiceOpera(this.multipleSelection)
          let invoices = list.map((item) => {
            let newItem = JSON.parse(JSON.stringify(item))
            delete newItem.fplx
            // eslint-disable-next-line eqeqeq
            newItem['state'] = '6'
            return newItem
          })
          let params = {
            taxNo: this.taxNo,
            period: this.csTaxMonth,
            invoices,
          }
          console.log(invoices)
          let data = await invoicesCancelGX(params)
          if (data.data.success) {
            this.$message({
              type: 'success',
              message: data.data.msg,
            })
            this.$refs.baseTable.initTable()
            this.loading = false
            this.btnLoading = false
          } else {
            this.$message({
              type: 'error',
              message: data.data.msg,
            })
            this.loading = false
            this.btnLoading = false
          }
        } catch (error) {
          console.log(error)
          this.loading = false
          this.btnLoading = false
        }
      },
      async sureGx() {
        // 确认勾选
        let invoices = this.gxlist.map((item) => {
          let newItem = JSON.parse(JSON.stringify(item))
          delete newItem.fplx
          // eslint-disable-next-line eqeqeq
          newItem['state'] = '1'
          return newItem
        })
        let params = {
          taxNo: this.taxNo,
          period: this.csTaxMonth,
          invoices,
        }
        console.log(invoices)
        this.btnLoading = true
        this.loading = true
        try {
          let data = await invoicesGX(params)
          if (data.data.success) {
            this.$message({
              type: 'success',
              message: data.data.msg,
            })
            this.$refs.baseTable.initTable()
            this.loading = false
            this.btnLoading = false
            this.countVisible = false
            this.gxlist = []
          } else {
            this.loading = false
            this.btnLoading = false
            this.$message({
              type: 'error',
              message: data.data.msg,
            })
          }
        } catch (error) {
          console.log(error)
          this.loading = false
          this.btnLoading = false
        }
      },
      isNullCheck(val) {
        // 非空计算
        if (val) {
          let r = parseFloat(val).toFixed(2)
          return parseFloat(r)
        } else {
          return 0
        }
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
