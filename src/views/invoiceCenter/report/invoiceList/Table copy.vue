<template>
  <div>
    <el-table
      v-loading="tableData == null"
      :data="tableData"
      style="width: 100%"
      size="small"
    >
      <el-table-column
        prop="goldtaxNum"
        label="发票号码"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="goldtaxCode"
        label="发票代码"
        width="130"
        sortable
      ></el-table-column>
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
