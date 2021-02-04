<template>
  <div class="review-invoice">
    <el-row class="operaBar">
      <el-col :span="5">
        <el-date-picker
          v-model="reviewMonth"
          type="month"
          style="width: calc(100% - 55px)"
          @change="cgMonth"
          placeholder="选择开票月份"
        ></el-date-picker>
        <el-tooltip
          class="item"
          effect="dark"
          :content="isStart ? '停止复查' : '开始复查'"
          placement="top"
        >
          <el-button
            :type="isStart ? 'warning' : 'success'"
            circle
            @click="stratReview"
            :disabled="isStart"
          >
            <i
              :class="[isStart ? 'icon-tingzhi' : 'icon-bofang']"
              class="iconfont"
            ></i>
          </el-button>
        </el-tooltip>
        <!--<el-button type="primary" plain :loading="true" v-if="isStart">正在复查数据中</el-button>-->
      </el-col>
      <el-col :span="19" class="opTbn">
        <el-progress
          :text-inside="true"
          :stroke-width="40"
          :percentage="reviewPercentage"
          :color="reviewColor"
        ></el-progress>
      </el-col>
    </el-row>
    <!--表格插件-->
    <el-row class="review-con" :gutter="20">
      <el-col class="conItemT" :span="15" v-loading="isStart">
        <!--表格插件-->
        <base-table
          class="baseTable"
          ref="baseTable"
          :option="tableSetting"
          :httpurl="httpUrl"
          @selectChange="handleSelectionChange"
          @operaFun="handleOpera"
          @dbRowClick="rowDbClick"
        ></base-table>
      </el-col>
      <el-col class="conItemD" :span="9">
        <time-data ref="timeData" :timename="'发票复查日志'"></time-data>
      </el-col>
    </el-row>
    <!--高级搜索-->
    <senior-search
      :sivisible="sivisible"
      :option="sioption"
      @handleClose="closeSenior"
      @handleSearch="seniorSearchSure"
    ></senior-search>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  import timeData from '@/base/timeData/timeData'
  import seniorSearch from '@/base/table/seniorSearch'
  export default {
    name: 'InvoiceReview',
    components: { timeData, BaseTable, seniorSearch },
    data() {
      return {
        multipleSelection: [], // 勾选行集合
        loading: false, // 表格load
        httpUrl: this.$ihttp + '/invoiceHeads/page', // 请求
        tableSetting: {
          checkBox: true, // 是否有选择框  选择回调事件为selectChange
          height: 'calc(100% - 58px)',
          showOpera: false, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          operaSetting: [],
          tbstyle: 'width: 100%', // 列表的样式
          pageSize: 20, // 初始每页显示数据量
          pageSizes: [20, 50, 100], // 每页显示集合
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
              prop: 'kpfmc',
              label: '销方名称',
              width: '260',
              isfixed: false,
            },
            {
              prop: 'kpfsbh',
              label: '销方税号',
              width: '200',
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
              prop: 'kprq',
              label: '开票日期',
              width: '120',
              isfixed: false,
            },
            {
              prop: 'createTime',
              label: '收票日期',
              width: '120',
              isfixed: false,
            },
            {
              prop: 'reimburseNo',
              label: '报销单号',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'bxState',
              label: '报销状态',
              width: '80',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.bxState) {
                  case '1':
                    result = '未报销'
                    break
                  case '2':
                    result = '已报销'
                    break
                }
                return result
              },
            },
            {
              prop: 'createMan',
              label: '提交人',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'orgId',
              label: '组织',
              width: '100',
              isfixed: false,
            },
          ], // 表头设置参数
          tableData: [],
          rowStyle: {}, // 设置特殊行
          httpData: {
            fplx: "'10102','10101','10103'",
          }, // 请求初始参数
        },
        sivisible: false, // 显示高级查询弹窗开关
        sioption: '', // 高级选项弹窗设置
        reviewMonth: '', // 复查月
        isStart: false, // 复查状态，默认未开始
        reviewColor: [
          { color: '#f56c6c', percentage: 25 },
          { color: '#e6a23c', percentage: 50 },
          { color: '#1989fa', percentage: 75 },
          { color: '#5cb87a', percentage: 100 },
        ], // 复查进度条颜色
        reviewPercentage: 0, // 复查进度条进度百分比
        timer_kp: '', // 启动开票定时器
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleOpera() {
        return false
      },
      rowDbClick() {
        return false
      },
      stratReview() {
        if (this.isStart) {
          this.stopReview()
          this.$message({
            type: 'info',
            message: '已停止复查',
          })
        } else {
          // this.$refs.doubtfulTable.openLoad()
          if (this.multipleSelection.length === 0) {
            this.$message({
              type: 'info',
              message: '请先选择一条数据！',
            })
            return false
          }
          this.isStart = true
          this.reviewPercentage = 0
          this.handleReview()
        }
      },
      getDataInfo() {
        // 获取日志
        let _this = this
        _this.axios
          .get(_this.$ihttp + '/invoiceHeads/cy_log')
          .then((res) => {
            console.log(res)
            _this.$refs.timeData.setData(res.data.data.data)
            let T = JSON.parse(res.data.data.data[0].value[0]).total
            let N = JSON.parse(res.data.data.data[0].value[0]).now
            if (N === T) {
              this.stopReview()
              this.$message({
                type: 'success',
                message: '所选数据复查成功！',
              })
            } else {
              this.reviewPercentage = N / T
            }
          })
          .catch((rev) => {
            console.log(rev)
            _this.stopReview()
            _this.$message({
              type: 'error',
              message: '复查失败！',
            })
          })
      },
      handleReview() {
        let _this = this
        let arr = JSON.parse(JSON.stringify(_this.multipleSelection))
        let csArr = arr.map((item) => "'" + item.id + "'")
        console.log(csArr)
        let params = csArr.join(',')
        _this.axios
          .get(_this.$ihttp + '/invoiceHeads/invoiceReview?ids=' + params)
          .then((res) => {
            console.log(res)
            this.$message({
              type: 'info',
              message: res.data.data.msg,
            })
            _this.getDataInfo()
            this.timer_kp = setInterval(() => {
              this.getDataInfo()
            }, 300)
          })
          .catch((rev) => {
            _this.isStart = false
            _this.$message({
              type: 'error',
              message: '复查失败！',
            })
          })
      },
      stopReview() {
        clearInterval(this.timer_kp)
        this.isStart = false
      },
      closeSenior() {
        this.sivisible = false
      },
      seniorSearchSure() {
        console.log('1')
      },
      cgMonth(val) {
        let httpPa = {}
        if (!val || val === '') {
          httpPa = {}
        } else {
          let date = new Date(val)
          let Y = date.getFullYear()
          let M = date.getMonth() + 1
          date.setMonth(M)
          date.setDate(0)
          let Dend = date.getDate()
          let STime = Y + '-' + M + '-1'
          let Dtime = Y + '-' + M + '-' + Dend
          httpPa = {
            kprqStart: STime,
            kprqEnd: Dtime,
          }
        }
        this.$refs.baseTable.searchTable(httpPa)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .review-invoice,.baseTable
    height 100%
  .review-con
    height calc(100% - 50px)
  .conItemT
    height calc(100% - 1px)
  .conItemD
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
