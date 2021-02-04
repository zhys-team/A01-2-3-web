<template>
  <div class="invoiceStatistics">
    <div class="tableDate">
      <el-date-picker
        v-model="monthVal"
        type="month"
        :clearable="true"
        @change="monthChoose"
        placeholder="选择统计月份"
      ></el-date-picker>
      <el-button
        v-print="'#print'"
        type="primary"
        icon="el-icon-printer"
        style="float: right"
      >
        打印
      </el-button>
    </div>
    <div id="print" class="tableCon" v-loading="loading">
      <count-table
        :header-set="countTbSet"
        class="countTable"
        ref="countTable"
      ></count-table>
    </div>
  </div>
</template>

<script>
  import countTable from '@/base/table/countTable'
  import { jxtj } from '@/api/invoice-heads'
  export default {
    name: 'InputSummary',
    components: { countTable },
    mounted() {
      this.getData({})
    },
    data() {
      return {
        loading: false,
        monthVal: '',
        countTbSet: {
          showTitle: true,
          title: '进项汇总统计表',
          showList: [
            {
              fplx: 'ywlx_zzszyfp',
              sl: '0',
              dkwsje: '0.00',
              dkje: '0.00',
              kpje: '0.00',
            },
            // {fplx: 'ywlx_txffp', sl: '0', dkwsje: '0.00', dkje: '0.00', kpje: '0.00'},
            {
              fplx: 'ywlx_jdcxstyfp',
              sl: '0',
              dkwsje: '0.00',
              dkje: '0.00',
              kpje: '0.00',
            },
            {
              fplx: 'ywlx_kyfp',
              sl: '0',
              dkwsje: '0.00',
              dkje: '0.00',
              kpje: '0.00',
            },
            // {fplx: 'ywlx_ncpcg', sl: '0', dkwsje: '0.00', dkje: '0.00', kpje: '0.00'}
          ],
        },
      }
    },
    methods: {
      async getData(param) {
        this.loading = true
        try {
          let data = await jxtj(param)
          console.log(data.data)
          let newData = this.dealData(data.data)
          console.log(newData)
          this.$refs.countTable.setTableData(newData)
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      },
      // 判断data数据
      dealData(arr) {
        let newArr = arr.filter((item) => {
          // eslint-disable-next-line eqeqeq
          return item.rzState == '1'
        })
        return newArr
      },
      monthChoose(val) {
        console.log(val)
        if (!val || val === '') {
          this.getData({})
        } else {
          let date = new Date(val)
          let Y = date.getFullYear()
          let M = date.getMonth() + 1
          date.setMonth(M)
          date.setDate(0)
          let Dend = date.getDate()
          let stDate = Y + '-' + M + '-1'
          let edDate = Y + '-' + M + '-' + Dend
          let param = {
            createTimeStart: stDate,
            createTimeEnd: edDate,
          }
          this.getData(param)
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
  .invoiceStatistics
    height 100%
  .tableCon
    height calc(100% - 50px)
  .countTable
    height calc(100% - 70px)
  .tableDate
    margin-bottom 10px
</style>
