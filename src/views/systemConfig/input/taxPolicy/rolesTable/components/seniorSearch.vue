<template>
  <el-dialog
    title="高级查询"
    :visible.sync="seniorVisible"
    width="30%"
    :before-close="handleClose">
    <span>
      <el-form ref="seniorFrom" :model="seniorFrom" label-width="100px">
        <el-form-item label="规则类型" prop="ruleType" v-if="seniorOption.ruleType">
          <el-select v-model="seniorFrom.ruleType" name="ruleType" clearable placeholder="请选择规则类型">
            <el-option
              v-for="item in seniorOption.ruleType"
              :key="item.val"
              :label="item.lable"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可抵" prop="canDeduct" v-if="seniorOption.canDeduct">
          <el-radio-group v-model="seniorFrom.canDeduct">
            <el-radio v-for="item in seniorOption.canDeduct" v-bind:key="item.val" :label="item.val">{{item.lable}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeV">取 消</el-button>
      <el-button type="primary" @click="sureSerch">查 询</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'senior-search',
  props: ['sivisible', 'option'],
  watch: {
    sivisible (newValue) {
      this.seniorVisible = newValue
    }
  },
  data () {
    return {
      seniorVisible: this.sivisible,
      seniorOption: this.option,
      seniorFrom: {ruleType: [], canDeduct: ''} // 提交的from
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
    sureSerch () {
      let param = this.seniorFrom
      this.$emit('handleSearch', param)
      this.closeV()
    }
  }
}
</script>

<style scoped>
</style>
