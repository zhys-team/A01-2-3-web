<template>
  <div>
    <el-table
      :data="invoiceSplitLines"
      style="width: 100%"
      height="450"
      size="small"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed
        prop="docLine"
        label="行号"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="groupNum"
        label="分组号"
        width="120"
      ></el-table-column>
      <el-table-column label="组状态" width="120">
        <template slot-scope="scope">
          <div
            v-if="scope.row.groupStatus == '1'"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <el-button type="primary" size="small" round>已提交金税</el-button>
          </div>

          <div
            v-if="scope.row.groupStatus == '0'"
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
            v-if="scope.row.groupStatus == '3'"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <el-button type="primary" size="small" round>已提交作废</el-button>
          </div>

          <div
            v-if="scope.row.groupStatus == '2'"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <el-button type="success" size="small" round>金税已开票</el-button>
          </div>
          <div
            v-if="scope.row.groupStatus == '9'"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <el-button type="success" size="small" round>金税已作废</el-button>
          </div>
        </template>
      </el-table-column>
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
        prop="itemName"
        label="开票产品名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="itemSpec"
        label="开票规格型号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="unitName"
        label="开票计量单位"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="taxCatecode"
        label="税收分类编码"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="taxRate"
        label="税率"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="zamountHsj"
        label="含税净金额（净值）"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="zamountWsj"
        label="不含税净金额（净值）"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="zamountSej"
        label="净税额（净值）"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="zpriceHsj"
        label="含税净单价"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="zpriceWsj"
        label="不含税净单价"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="groupCopyfrom"
        label="分组作废复制重开源组"
        width="120"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selection: null,
      }
    },
    computed: {
      invoiceSplitLines() {
        if (this.$store.state.invoiceHead) {
          return this.$store.state.invoiceHead.invoiceSplitLines
        } else {
          return null
        }
      },
    },
    methods: {
      handleSelectionChange(val) {
        if (
          val.length == this.$store.state.invoiceHead.invoiceSplitLines.length
        ) {
          this.$store.state.selection.isAllSelected = true
        } else {
          this.$store.state.selection.isAllSelected = false
        }
        this.$store.state.selection.invoiceSplitLines = val
      },
    },
  }
</script>

<style scoped>
  * {
    transition: all 0.5s !important;
  }
</style>
