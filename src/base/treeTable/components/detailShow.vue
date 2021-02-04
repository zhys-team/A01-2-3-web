<template>
  <el-dialog :title="selfTitle" :visible.sync="dialogFormVisible" width="30%" :before-close="handleClose">
    <el-form :model="subForm" label-width="100px">
      <el-form-item v-for="item in formSetting.input" v-bind:key="item.label" :label="item.label">
        <el-input v-model="subForm[item.pro]" :placeholder="item.placeholder" :disabled="item.disabled" class="detailInput"></el-input>
      </el-form-item>
      <el-form-item v-for="item in formSetting.cascader" v-bind:key="item.label" :label="item.label">
        <el-cascader v-model="subForm[item.pro]" :options="item.options" class="detailCascader"></el-cascader>
      </el-form-item>
      <el-form-item v-for="item in formSetting.radio" v-bind:key="item.label" :label="item.label">
        <el-radio-group v-model="subForm[item.pro]">
          <el-radio v-for="radioitem in item.options" v-bind:key="radioitem.label" :label="radioitem.label" class="detailRadio">{{radioitem.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeV">取 消</el-button>
      <el-button type="primary" @click="sureOpera">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'detail-show',
  props: ['visible', 'option', 'title', 'type', 'data'],
  watch: {
    visible (newValue) {
      this.dialogFormVisible = newValue
    },
    title (val) {
      this.selfTitle = val
    },
    type (val) {
      this.selfType = val
    },
    data: {
      handler (val, oldVal) {
        this.subForm = JSON.parse(JSON.stringify(val))
      },
      deep: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      formSetting: this.option,
      selfTitle: this.title,
      selfType: this.type,
      subForm: this.data
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
    sureOpera () {
      let param = this.subForm
      param['subtype'] = this.selfType
      this.$emit('handleOpera', param)
      this.closeV()
    }
  }
}
</script>

<style scoped>
  .detailInput,.detailCascader{
    width: 260px;
  }
</style>
