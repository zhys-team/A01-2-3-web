<template>
  <div>
    <el-table
      :data="invoiceMergefLines"
      style=""
      height="450"
      size="small"
      border
    >
      <el-table-column
        fixed
        prop="docLine"
        label="行号"
        width="50"
      ></el-table-column>
      <el-table-column label="开票产品名称" width="120">
        <template slot-scope="scope">
          <span
            v-if="edit != 'itemName'"
            @click="edit = 'itemName'"
            v-text="scope.row.itemName"
          ></span>
          <input
            v-if="edit == 'itemName'"
            v-model="scope.row.itemName"
            type="text"
            style="height: 100%; width: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column label="开票规格型号" width="120">
        <template slot-scope="scope">
          <span
            v-if="edit != 'itemSpec'"
            @click="edit = 'itemSpec'"
            v-text="scope.row.itemSpec"
          ></span>
          <input
            v-if="edit == 'itemSpec'"
            v-model="scope.row.itemSpec"
            type="text"
            style="height: 100%; width: 100%"
          />
        </template>
      </el-table-column>

      <el-table-column label="开票计量单位" width="120">
        <template slot-scope="scope">
          <span
            v-if="edit != 'unitName'"
            @click="edit = 'unitName'"
            v-text="scope.row.unitName"
          ></span>
          <input
            v-if="edit == 'unitName'"
            v-model="scope.row.unitName"
            type="text"
            style="height: 100%; width: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column label="税收分类编码" width="120">
        <template slot-scope="scope">
          <span
            v-if="edit != 'taxCatecode'"
            @click="edit = 'taxCatecode'"
            v-text="scope.row.taxCatecode"
          ></span>
          <input
            v-if="edit == 'taxCatecode'"
            v-model="scope.row.taxCatecode"
            type="text"
            style="height: 100%; width: 100%"
          />
        </template>
      </el-table-column>
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
        prop="giftFlag"
        label="是否赠品行"
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
        prop="itemNum"
        label="物料编号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="itemNameOrg"
        label="系统开票产品名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="itemSpecOrg"
        label="系统开票规格型号"
        width="120"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        edit: '',
      }
    },
    computed: {
      invoiceMergefLines() {
        if (this.$store.state.invoiceHead) {
          return this.$store.state.invoiceHead.invoiceMergefLines
        } else {
          return null
        }
      },
    },
    methods: {},
  }
</script>

<style scoped>
  * {
    transition: all 0.5s !important;
  }
</style>
