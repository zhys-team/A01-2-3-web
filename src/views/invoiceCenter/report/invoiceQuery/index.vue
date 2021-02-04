<template>
  <div>
    <div class="row search">
      <div class="item" style="width: 25%">
        <span class="title">单据编号：</span>
        <div
          class="box"
          style="
            display: flex;
            flex-decration: row;
            align-items: center;
            justify-content: space-between;
          "
        >
          <el-input
            v-model="query.docNum1"
            size="small"
            placeholder=""
          ></el-input>
          <span style="margin: 0 20px">至</span>
          <el-input
            v-model="query.docNum2"
            size="small"
            placeholder=""
          ></el-input>
        </div>
      </div>
      <div class="item" style="width: 30%">
        <span class="title">单据日期：</span>
        <div class="box">
          <el-date-picker
            v-model="value2"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="item" style="width: 10%">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="search()"
        >
          搜索
        </el-button>
      </div>
    </div>

    <div
      class="content"
      style="margin-top: 30px; padding: 0px 20px; margin-bottom: 20px"
    >
      <el-table
        v-loading="isLoading"
        :data="invoiceHeads"
        style="width: 100%"
        size="small"
        border
        height="650"
      >
        <el-table-column fixed="" label="单据编号" width="150">
          <template slot-scope="scope">
            <router-link
              tag="a"
              :to="{ path: '/dashboard?docNum=' + scope.row.docNum }"
            >
              {{ scope.row.docNum }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="单据状态" width="120">
          <template slot-scope="scope">
            <div
              v-if="scope.row.docStatus == '1'"
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="primary" size="small" round>
                已提交金税
              </el-button>
            </div>
            <div
              v-if="scope.row.docStatus == '3'"
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="primary" size="small" round>
                已提交作废
              </el-button>
            </div>

            <div
              v-if="scope.row.docStatus == '0'"
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="info" size="small" round>制单中</el-button>
            </div>

            <div
              v-if="scope.row.docStatus == '2'"
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="success" size="small" round>
                金税已开票
              </el-button>
            </div>

            <div
              v-if="scope.row.docStatus == '9'"
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="success" size="small" round>
                金税已作废
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="docDate"
          label="业务日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="orgId"
          label="开票公司"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custIdBill"
          label="开票客户ID"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="custName"
          label="开票客户全称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="开票人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="invoiceType"
          label="发票类型"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="mergeQty"
          label="拼单数量"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="mergeAmt"
          label="拼单金额（万元）"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custTaxcode"
          label="开票客户税号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custAddress"
          label="开票客户地址"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custTelephone"
          label="开票客户电话"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custBankname"
          label="开票客户银行"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custBankaccount"
          label="开票客户账号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="goldtaxCode"
          label="金税发票代码"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="goldtaxNum"
          label="金税发票号码"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="orgTaxcode"
          label="公司税号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="orgMachine"
          label="税控机号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="billDate"
          label="提交开票日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="billGdate"
          label="金税开票日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="cancelDate"
          label="提交作废日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="cancelGdate"
          label="金税作废日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="invoiceRedReqm"
          label="红字申请原因"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="zamountHswc"
          label="净含税额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="zamountWswc"
          label="净未税额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="zamountSewc"
          label="净税额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="payeeName"
          label="收款人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="checkName"
          label="复核人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="mergefType"
          label="合并方式"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="orgTaxexceed"
          label="开票公司发票限额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="billRemark"
          label="发票备注"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="creationDate"
          label="创建时间"
          width="120"
        ></el-table-column>
      </el-table>
    </div>
    <div style="float: right; margin-right: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { getInvoiceHeads } from '@/api/zhys'
  export default {
    name: 'InvoiceQuery',

    data() {
      return {
        invoiceHeads: null,
        isLoading: false,
        query: {
          docDateEnd: '',
          docDateStart: '',
          docNum1: '',
          docNum2: '',
        },
        queryCondition: {},
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        value2: '',
        page: {
          total: null,
          currentPage: 1,
          pageSize: 8,
        },
      }
    },
    watch: {
      value2: {
        handler(newVal, oldVal) {
          if (newVal) {
            console.log(JSON.stringify(newVal[0]))
            this.query.docDateStart = JSON.stringify(newVal[0])
            this.query.docDateEnd = JSON.stringify(newVal[1])
          } else {
            this.query.docDateStart = ''
            this.query.docDateEnd = ''
            this.queryCondition.docDateStart = ''
            this.queryCondition.docDateEnd = ''
          }
        },
        deep: true,
      },
      query: {
        handler(newVal, oldVal) {
          this.queryCondition = {}
          for (var name in newVal) {
            if (newVal[name]) {
              this.queryCondition[name] = newVal[name]
            }
          }
        },
        deep: true,
      },
    },
    created() {
      this.gainInvoiceHeads(this.page.currentPage, this.page.pageSize, null)
    },

    methods: {
      pageChange(val) {
        this.page.currentPage = val
        this.gainInvoiceHeads(this.page.currentPage, this.page.pageSize, null)
      },
      async gainInvoiceHeads(pageNum, pageSize, datas) {
        this.isLoading = true
        let { data } = await getInvoiceHeads(pageNum, pageSize, datas)
        if (data.code == 1) {
          console.log('import success!')
          // this.$message.error(data.msg);
          this.invoiceHeads = data.data.rows
          this.page.total = data.data.total
          this.page.currentPage = pageNum
          console.log(this.page)
        } else {
          if (data.msg) {
            this.$message.error(data.msg)
          } else {
            this.$message.error(data)
          }
        }
        console.log(data)
        this.isLoading = false
      },
      search() {
        this.gainInvoiceHeads(
          this.page.currentPage,
          this.page.pageSize,
          this.queryCondition
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .groups {
    display: flex;
    flex-direction: row;
    .group {
      width: 50%;
      padding: 0px 5px;
      // border: 1px dotted #fb7299;

      .row {
        margin-top: 15px;
      }
    }
  }

  .item {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .title {
      min-width: 110px;
    }
    .box {
      width: 100% !important;
    }
    margin-left: 50px;
  }

  .label {
    height: 32px;
    line-height: 32px;
    min-width: 100px;
    text-align: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    //   justify-content: space-between;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  .search {
    margin-top: 20px;
    //   padding-left: 50px;
  }
  a {
    transition: all 0.5s;
    display: block;
  }
  a:hover {
    color: #1890ff;
    text-decoration: underline;
  }
</style>
