<template>
  <div>
    <el-table
      v-loading="tableData == null"
      :data="tableData"
      style="font-size: 8px"
      size="small"
    >
      >
      <el-table-column
        fixed
        prop="goldtaxNum"
        label="发票号码"
        width="100"
        sortable
      >
        <template slot-scope="scope">
          <span style="cursor: pointer" @click="getInvoiceDetail2(scope.row)">
            {{ scope.row.goldtaxNum }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="goldtaxCode"
        label="发票代码"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="invoiceType"
        label="发票类型"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.invoiceRed != 'X'" type="primary">
              蓝票
            </el-tag>
            <el-tag v-if="scope.row.invoiceRed == 'X'" type="danger">
              红票
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="invoiceType"
        label="票种"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.invoiceType == '3'">电子专票</el-tag>
            <el-tag v-if="scope.row.invoiceType == '4'" type="success">
              电子普票
            </el-tag>
            <el-tag v-if="scope.row.invoiceType == '5'" type="info">
              外销发票
            </el-tag>
            <el-tag v-if="scope.row.invoiceType == '1'" type="warning">
              纸质普票
            </el-tag>
            <el-tag v-if="scope.row.invoiceType == '2'" type="danger">
              纸质专票
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="billGdate"
        label="开票时间"
        width="150"
        sortable
      ></el-table-column>

      <el-table-column
        prop="custName"
        label="购方名称"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="custTaxcode"
        label="购方税号"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="zamountWsj"
        label="未税金额"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="zamountSej"
        label="税额"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="zamountHsj"
        label="含税金额"
        width="100"
        sortable
      ></el-table-column>

      <el-table-column
        prop="epdfUrl"
        label="发票预览"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <div>
            <a
              v-if="scope.row.epdfUrl"
              :href="scope.row.epdfUrl"
              target="_blank"
            >
              <i class="el-icon-link"></i>
            </a>
            <span
              v-if="!scope.row.epdfUrl"
              :href="scope.row.epdfUrl"
              target="_blank"
            ></span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情页设计 -->
    <transition name="el-fade-in-linear">
      <div
        v-if="showDetail"
        class="invoice"
        @mouseenter="continueShowDetail()"
        @mouseleave="hideDetail"
      >
        <i
          class="el-icon-close"
          style="position: absolute; top: 10px; right: 10px"
          @click="showDetail = false"
        ></i>
        <div class="head">
          <h4
            v-if="invoiceHead != null && invoiceHead.invoiceSplitLines != null"
            style="position: relative"
          >
            <span>单据号:{{ invoiceHead.docNum }}</span>
            <span>整单发票号码:{{ invoiceHead.goldtaxNum }}</span>
            <span>客户名称:{{ invoiceHead.orgName }}</span>
            <span v-if="invoiceHead.custTelephone">
              客户电话:{{ invoiceHead.custTelephone }}
            </span>
            <span v-if="invoiceHead.custMobile">
              客户手机:{{ invoiceHead.custMobile }}
            </span>

            <span style="margin-left: 20px; margin-right: 5px">
              发票代码:
              <el-tag :key="'ssss'" :type="'info'" effect="dark">
                {{ invoiceHead.invoiceSplitLines[0].goldtaxCode }}
              </el-tag>
            </span>
            <span style="margin-right: 0px">
              发票号码:
              <el-tag :key="'ssss'" :type="'success'" effect="dark">
                {{ invoiceHead.invoiceSplitLines[0].goldtaxNum }}
              </el-tag>
              组号:{{ invoiceHead.invoiceSplitLines[0].groupNum }}
            </span>
          </h4>
        </div>
        <div class="body">
          <el-table
            :data="invoiceHead.invoiceSplitLines"
            :show-header="true"
            style="width: 100%"
            show-summary
          >
            <el-table-column prop="docLine" label="行号"></el-table-column>
            <el-table-column
              prop="itemName"
              label="商品名称"
              width="250"
            ></el-table-column>
            <el-table-column prop="itemSpec" label="规格型号"></el-table-column>
            <el-table-column prop="unitName" label="单位"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="zpriceHsj" label="单价"></el-table-column>
            <el-table-column
              prop="zamountHsj"
              label="含税金额"
            ></el-table-column>
            <el-table-column prop="taxRate" label="税率"></el-table-column>
            <el-table-column prop="zamountSej" label="税额"></el-table-column>
          </el-table>
          <div
            v-if="invoiceHead != null && invoiceHead.invoiceSplitLines != null"
          >
            <div style="margin-top: 10px"></div>
            <div style="margin-top: 5px"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { getInvoiceDetail } from '@/api/invoice.js'
  export default {
    props: {
      tableData: {
        type: Array,
        default: null,
      },
    },
    data() {
      return {
        showDetail: false,
        timer: null,
        invoiceHead: {},
      }
    },
    methods: {
      continueShowDetail() {
        this.showDetail = true
        clearTimeout(this.timer)
        this.timer = null
      },
      hideDetail() {
        this.timer = setTimeout(() => {
          this.showDetail = false
          this.invoiceHead.invoiceSplitLines = []
          clearTimeout(this.timer)
        }, 5000)
      },
      //合计
      getInvoiceDetail2(row) {
        this.getInvoiceDetail(row.docNum, row.groupNum)
      },
      async getInvoiceDetail(docNum, groupNum) {
        this.showDetail = true
        clearTimeout(this.timer)
        this.timer = null
        let { data: result } = await getInvoiceDetail(docNum, groupNum)
        if (result.success) {
          // this.$message.success(result.msg)
          this.invoiceHead = result.data
          this.invoiceHead.invoiceSplitLines = result.data.invoiceSplitLines
          console.log(this.invoiceHead)
        } else {
          this.$message.error(result.msg)
        }
        this.hideDetail()
      },
    },
  }
</script>

<style scoped lang="scss">
  .all {
    padding: 20px;
  }
  .invoice {
    padding: 20px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-right: 5px solid #50bfff;
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    max-height: 100vh;
    overflow: auto;
    // transform: translate(-50%, -50%);

    .head {
      h4 {
        border-left: 5px solid #50bfff;
        padding: 0px 20px;
        opacity: 0.7;
        span {
          margin-right: 20px;
        }
      }
    }
  }
</style>
