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
        <!-- <el-form-item label="销方名称">
          <el-input v-model="searchList.kpfmc" placeholder="请输入销方名称" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="认证状态">
          <el-radio-group v-model="searchList.rzState">
            <el-radio
              v-for="item in rzStatelist"
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
          <el-button
            v-show="isShow"
            type="success"
            icon="el-icon-upload"
            @click="turnOff"
            style="float: right"
          >
            批量转出
          </el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="重置刷新"
            placement="top-start"
            style="float: right"
          >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              @click="refreshTable"
            ></el-button>
          </el-tooltip>
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
  export default {
    name: 'DeductExport',
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
            // 表格表头设置
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
              prop: 'createTime',
              label: '收票日期',
              width: '120',
              isfixed: false,
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
                  case '3':
                    result = '已认证'
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
          ],
          httpData: {
            specialType: 'dl_zptz',
            bxState: '1',
            rzState: '3',
            spfsbh: '913300007420055726',
          }, // 请求初始参数
        },
        rzStatelist: [
          { val: '3', label: '已认证' },
          { val: '4', label: '已转出' },
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
        kjdkqQ: '', // 会计抵扣期
        multipleSelection: [], // 勾选行集合
        invoiceMonth: '', // 开票月份
        taxMonth: [], // 税款所属期
        countVisible: false, // 统计弹窗的开关
        csTaxMonth: '', // 所选的税款所属期
        searchList: { rzState: '3', orgId: null }, // 查询参数
        countlist: [],
        gxlist: [],
        isShow: true, // 是否
        taxNo: '913300007420055726', // 税号
      }
    },
    methods: {
      getTaxMonth() {
        let date = new Date()
        let Y = date.getFullYear()
        let prevM = date.getMonth()
        let M = date.getMonth() + 1
        let sM = ''
        let sprevM = ''
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
          this.csTaxMonth = Y + sprevM
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
        if (arr && arr.length > 0) {
          this.searchList.kprqStart = arr[0]
          this.searchList.kprqEnd = arr[1]
        } else {
          this.searchList.kprqStart = ''
          this.searchList.kprqEnd = ''
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
        this.$confirm('是否确认将该发票做进项转出?', '提示', {
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
        this.invoiceMonth = new Date()
        this.$refs.baseTable.initTable()
      },
      resetForm() {
        // 重置表单并刷新表格
        this.searchList = { rzState: '3' }
        this.isShow = true
        this.$refs.baseTable.initTable()
      },
      kjdkqChange(val) {
        if (val) {
          let arr = val.split('-')
          this.searchList.kjdkq = arr[0] + arr[1]
        } else {
          this.searchList.kjdkq = ''
        }
      },
      onSubmit() {
        // 确定查询
        console.log(this.searchList)
        this.$refs.baseTable.searchTable(this.searchList)
        // eslint-disable-next-line eqeqeq
        if (this.searchList.rzState == '3') {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      sureTurnOff(ids) {
        // 批量转出
        let _this = this
        _this.loading = true
        _this.axios
          .get(
            _this.$ihttp +
              '/invoiceHeads/updateRzState?ids=' +
              ids +
              '&rz_state=4'
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
