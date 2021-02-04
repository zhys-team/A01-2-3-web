<template>
  <div class="tableCon">
    <div class="conHeader" v-if="selfHeaderSet && selfHeaderSet.showTitle">
      <div class="headerTitle">{{selfHeaderSet.title}}</div>
      <div class="headerSubs">
        <el-row :gutter="10">
          <el-col :span="6">纳税人名称：浙江省天正设计工程有限公司</el-col>
          <el-col :span="6">纳税人识别号：913300007420055726</el-col>
          <el-col :span="6">单位（元）</el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>
    <el-table
      :data="tableData"
      sum-text="总计"
      show-summary
      style="width: 100%">
      <el-table-column prop="fplx" :formatter="getName">
        <template slot="header">
          <div class="tableHead">
            <span class="headRight">认证方式</span>
            <span class="headLeft">发票类型</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申报/认证抵扣" align="center">
        <el-table-column
          prop="sl"
          label="份数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dkwsje"
          label="未税金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dkje"
          label="税额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="kpje"
          label="含税金额"
          align="center">
        </el-table-column>
      </el-table-column>
      <!--<el-table-column label="申报抵扣" align="center">-->
        <!--<el-table-column-->
          <!--prop="sbNum"-->
          <!--label="份数"-->
          <!--align="center"-->
          <!--width="60">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="sbWsje"-->
          <!--label="未税金额"-->
          <!--align="center"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="sbSe"-->
          <!--label="税额"-->
          <!--align="center"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="sbHsje"-->
          <!--label="含税金额"-->
          <!--align="center"-->
          <!--width="120">-->
        <!--</el-table-column>-->
      <!--</el-table-column>-->
      <!-- <el-table-column label="合计" align="center">
        <el-table-column
          prop="sl"
          label="份数"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="dkwsje"
          label="未税金额"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="dkje"
          label="税额"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="kpje"
          label="含税金额"
          align="center"
          width="150">
        </el-table-column>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'count-table',
  props: ['headerSet'],
  data () {
    return {
      selfHeaderSet: JSON.parse(JSON.stringify(this.headerSet)),
      tableData: []
    }
  },
  methods: {
    countRow (arr) {
      let _this = this
      let newArr = JSON.parse(JSON.stringify(arr))
      newArr.forEach(item => {
        item['hjNum'] += _this.isNullCheck(item.sl)
        item['hjWsje'] += _this.isNullCheck(item.dkwsje)
        item['hjSe'] += _this.isNullCheck(item.dkje)
        item['hjHsje'] += _this.isNullCheck(item.kpje)
      })
      return newArr
    },
    sortTable (arr) {
      let newArr = this.headerSet.showList.map(item => {
        return {
          fplx: item.fplx,
          sl: '0',
          dkwsje: '0.00',
          dkje: '0.00',
          kpje: '0.00'
        }
      })
      console.log(newArr)
      if (arr.length > 0) {
        arr.forEach(item => {
          newArr.forEach(citem => {
            if (citem.fplx === item.fplx) {
              // 如果发票为进项转出发票需要变为负号
              if (citem.fplx === 'jxzc') {
                citem.sl = -item.sl
                citem.dkwsje = -(this.isNullCheck(item.dkwsje).toFixed(2))
                citem.dkje = -(this.isNullCheck(item.dkje).toFixed(2))
                citem.kpje = -(this.isNullCheck(item.kpje).toFixed(2))
              } else {
                citem.sl = item.sl
                citem.dkwsje = this.isNullCheck(item.dkwsje).toFixed(2)
                citem.dkje = this.isNullCheck(item.dkje).toFixed(2)
                citem.kpje = this.isNullCheck(item.kpje).toFixed(2)
              }
            }
          })
        })
      } else {
        newArr.forEach(citem => {
          citem.sl = '0'
          citem.dkwsje = '0.00'
          citem.dkje = '0.00'
          citem.kpje = '0.00'
        })
      }
      return newArr
    },
    isNullCheck (val) { // 非空计算
      if (val) {
        let r = parseFloat(val).toFixed(2)
        return parseFloat(r)
      } else {
        return 0
      }
    },
    setTableData (arr) {
      console.log(arr)
      this.tableData = this.sortTable(arr)
      console.log(this.tableData)
    },
    getName (row) {
      let val = row.fplx
      let result = ''
      switch (val) {
        case 'ywlx_kyfp' :
          result = '客运发票'
          break
        case 'ywlx_zzszyfp' :
          result = '增值税专用发票'
          break
        case 'ywlx_hwysyzyfp' :
          result = '货物运输业专用发票'
          break
        case 'ywlx_txffp' :
          result = '通行费发票'
          break
        case 'ywlx_jdcxstyfp' :
          result = '机动车销售统一发票'
          break
        case 'ywlx_ncpcg' :
          result = '农产品销售发票'
          break
        case 'ywlx_ypfp' :
          result = '油品发票'
          break
        case 'jxzc' :
          result = '进项转出发票'
          break
      }
      return result
    }
  }
}
</script>

<style scoped lang="stylus">
  .tableCon
    padding 10px
    background-color #fff
    .conHeader
      position relative
      margin-bottom 0px
      .headerTitle
        color #666
        text-align center
        padding 15px 0 20px 0
        border-bottom 1px solid #ececec
        font-size 20px
      .headerSubs
        padding 15px 5px
        color #666
        font-size 15px
      .tableDate
        position absolute
        top 5px
        left 5px
  .tableHead
    height 62px
    width 100%
  .headRight
    position absolute
    top 0px
    right 10px
  .headLeft
    position absolute
    bottom  0px
    left 10px
</style>
