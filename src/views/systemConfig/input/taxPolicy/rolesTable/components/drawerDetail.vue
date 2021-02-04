<template>
  <el-dialog
    :title="detailTitle"
    :visible.sync="detailVisible"
    width="50%"
    :modal="false"
    :before-close="handleClose">
    <span>
      <el-row :gutter="10">
        <el-form ref="detailFrom" :model="detailFrom" label-width="100px">
          <el-col :span="12">
            <el-form-item label="发票类型" prop="invoiceType">
              <el-select name="invoiceType" v-model="detailFrom.invoiceType" placeholder="请选择" style="width: 220px" clearable>
                <el-option
                  v-for="item in invoiceTypeArr"
                  :key="item.code"
                  :label="item.title"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="isEnable">
              <el-radio-group v-model="detailFrom.isEnable">
                <el-radio v-for="item in isEnableArr" v-bind:key="item.code" :label="item.code">{{item.title}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无明细" prop="isDetailJudueArr">
              <el-radio-group v-model="detailFrom.isDetailJudue">
                <el-radio v-for="item in isDetailJudueArr" v-bind:key="item.code" :label="item.code">{{item.title}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排除/选取" prop="exclusionOrSelection">
              <el-radio-group v-model="detailFrom.exclusionOrSelection">
                <el-radio v-for="item in exclusionOrSelectionArr" v-bind:key="item.code" :label="item.code">{{item.title}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="明细字段" prop="detailField">
              <el-input v-model="detailFrom.detailField" clearable placeholder="" style="width: 220px" :disabled="detailFrom.isDetailJudue == '2'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税额计算方式" prop="taxCalMethod">
              <el-radio-group v-model="detailFrom.taxCalMethod">
                <el-radio v-for="item in taxCalMethodArr" v-bind:key="item.code" :label="item.code">{{item.title}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率" prop="taxRate">
              <el-input v-model="detailFrom.taxRate" clearable placeholder="" style="width: 220px" :disabled="detailFrom.taxCalMethod == '1'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否特殊" prop="isSpecialBill">
              <el-radio-group v-model="detailFrom.isSpecialBill">
                <el-radio v-for="item in isSpecialBillArr" v-bind:key="item.code" :label="item.code">{{item.title}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特殊票据编码" prop="specialNo">
              <el-input v-model="detailFrom.specialNo" clearable placeholder="" style="width: 220px" :disabled="detailFrom.isSpecialBill == '1'"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeV">取 消</el-button>
      <el-button type="primary" @click="sureEdit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'drawer-detail',
  props: ['sivisible', 'dgdata', 'title', 'invoicetp', 'isdetailjun', 'isenable', 'orselection', 'taxcal', 'specialbill'],
  watch: {
    sivisible (newValue) {
      this.detailVisible = newValue
    },
    dgdata: {
      handler (val, oldVal) {
        this.detailFrom = val
      },
      deep: true
    },
    title (newValue) {
      this.detailTitle = newValue
    }
  },
  data () {
    return {
      detailVisible: this.sivisible,
      detailTitle: this.title,
      invoiceTypeArr: [ // 发票类型
        {code: 10100, title: '增值税专用发票'},
        {code: 10101, title: '增值税普通发票'},
        {code: 10102, title: '增值税普通发票电票'},
        {code: 10103, title: '增值税普通发票卷票'},
        {code: 10107, title: '通行费电子发票'},
        {code: 10500, title: '出租车发票'},
        {code: 10503, title: '火车票'},
        {code: 10505, title: '汽车票'},
        {code: 10506, title: '飞机票'},
        {code: 10507, title: '过路过桥费'},
        {code: 10400, title: '机打发票'},
        {code: 10104, title: '机动车销售发票'},
        {code: 10105, title: '二手车销售发票'},
        {code: 10200, title: '定额发票'},
        {code: 20100, title: '商业小票'}
      ],
      isDetailJudueArr: this.isdetailjun,
      isEnableArr: this.isenable,
      exclusionOrSelectionArr: this.orselection,
      taxCalMethodArr: this.taxcal,
      isSpecialBillArr: this.specialbill,
      detailFrom: this.dgdata // 提交的from
    }
  },
  methods: {
    handleClose (done) {
      done()
      this.closeV()
    },
    closeV () {
      this.seniorVisible = false
      this.$emit('handleClose')
    },
    sureEdit () {
      this.$emit('handleSure', this.detailFrom)
      this.closeV()
    }
  }
}
</script>

<style scoped>

</style>
