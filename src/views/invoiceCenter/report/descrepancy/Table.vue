<template>
  <div>
    <el-table
      v-loading="tableData == null"
      :data="tableData"
      style="width: 100%"
      size="small"
    >
      <el-table-column
        prop="docNum"
        label="单据编码"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="orgId"
        label="开票公司编码"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="orgName"
        label="开票公司名称"
        min-width="120"
        max-width="200"
      ></el-table-column>

      <el-table-column
        prop="custIdAr"
        label="应收客户编码"
        min-width="120"
        max-width="200"
      ></el-table-column>
      <el-table-column
        prop="custNameAr"
        label="应收客户名称"
        min-width="270"
        max-width="600"
      ></el-table-column>

      <el-table-column
        prop="custIdBill"
        label="开票客户编码"
        min-width="120"
        max-width="300"
      ></el-table-column>
      <el-table-column
        prop="custNameBill"
        label="开票客户名称"
        min-width="270"
        max-width="500"
      ></el-table-column>
      <el-table-column
        prop="custName"
        label="开票客户全称"
        min-width="270"
        max-width="500"
      ></el-table-column>
      <el-table-column
        prop="invoiceType"
        label="发票类型"
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
        prop="userId"
        label="开票人编码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="开票人姓名"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="docDate"
        label="单据日期"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="docStatus"
        label="单据状态"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.docStatus == '1'" style="">
            <el-button type="primary" size="small" round>已提交金税</el-button>
          </div>
          <div v-if="scope.row.docStatus == '3'">
            <el-button type="primary" size="small" round>已提交作废</el-button>
          </div>

          <div v-if="scope.row.docStatus == '0'">
            <el-button type="info" size="small" round>制单中</el-button>
          </div>

          <div v-if="scope.row.docStatus == '2'">
            <el-button type="success" size="small" round>金税已开票</el-button>
          </div>

          <div v-if="scope.row.docStatus == '9'">
            <el-button type="success" size="small" round>金税已作废</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="billGdate"
        label="金税开票日期"
        min-width="150"
        max-width="500"
      ></el-table-column>
      <el-table-column
        prop="goldtaxCode"
        label="金税发票代码"
        width="130"
        sortable
      ></el-table-column>
      <el-table-column
        prop="goldtaxNum"
        label="金税发票号码"
        sortable
        width="130"
      ></el-table-column>
      <el-table-column
        prop="zamountHsy"
        label="应收金额"
        sortable
        width="100"
      ></el-table-column>
      <el-table-column
        prop="zamountHsj"
        label="含税净金额"
        sortable
        width="130"
      ></el-table-column>
      <el-table-column
        prop="zamountWsj"
        label="不含税净金额"
        sortable
        width="130"
      ></el-table-column>
      <el-table-column
        prop="zamountSej"
        label="净税额"
        sortable
        width="100"
      ></el-table-column>

      <el-table-column
        prop="zamountHswc"
        label="含税净金额(尾差)"
        sortable
        width="160"
      ></el-table-column>
      <el-table-column
        prop="zamountWswc"
        label="不含税净金额(尾差)"
        sortable
        width="170"
      ></el-table-column>
      <el-table-column
        prop="zamountWswc"
        label="净税额(尾差)"
        sortable
        width="170"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array,
        default: null,
      },
    },
  }
</script>

<style></style>
