<template>
  <el-drawer
    :title="title"
    :visible.sync="selfDrawer"
    :direction="direction"
    v-loading="loading"
    :before-close="handleClose"
    size="auto">
    <div class="drawerContent">
      <div class="drawerTop">
        <el-form ref="rolesForm" :model="rolesForm" label-width="100px">
          <el-row :gutter="10" style="margin: 0">
            <el-col :span="6">
              <el-form-item label="规则类型">
                <el-select v-model="rolesForm.ruleType" clearable placeholder="请选择规则类型" style="width: 220px">
                  <el-option label="税务类型" value="1"></el-option>
                  <el-option label="发票大类" value="2"></el-option>
                  <el-option label="发票业务类型" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="规则名称">
                <el-input v-model="rolesForm.name" clearable placeholder="请输入规则名称" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="规则编码">
                <el-input v-model="rolesForm.code" clearable placeholder="请输入规则编码" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否可抵扣">
                <el-radio-group v-model="rolesForm.canDeduct">
                  <el-radio label="2">不可抵扣</el-radio>
                  <el-radio label="1">可抵扣</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="启用日期">
                <el-date-picker
                  v-model="rolesForm.startDate"
                  clearable
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" style="width: 220px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="停用日期">
                <el-date-picker
                  v-model="rolesForm.endDate"
                  clearable
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" style="width: 220px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="tableOpera">
              <el-button class="tableBtn" type="primary" round @click="addRow">新增行项</el-button>
              <el-button icon="el-icon-refresh" circle @click="initTable"></el-button>
              <!--<el-button class="tableBtn" type="danger" round>批量删除</el-button>-->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="drawerTable">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="100%">
          <el-table-column
            fixed
            align="center"
            type="selection"
            width="60">
          </el-table-column>
          <el-table-column
            prop="invoiceType"
            label="发票类型"
            :formatter="getRowType"
            width="300">
          </el-table-column>
          <el-table-column
            prop="isDetailJudue"
            label="是否明细"
            :formatter="getRowType"
            width="150">
          </el-table-column>
          <el-table-column
            prop="detailField"
            label="明细字段"
            width="200">
          </el-table-column>
          <el-table-column
            prop="isEnable"
            label="是否启用"
            :formatter="getRowType"
            width="150">
          </el-table-column>
          <el-table-column
            prop="exclusionOrSelection"
            label="排除/选取"
            :formatter="getRowType"
            width="150">
          </el-table-column>
          <el-table-column
            prop="taxCalMethod"
            label="税额计算方式"
            :formatter="getRowType"
            width="200">
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="税率"
            width="100">
          </el-table-column>
          <el-table-column
            prop="isSpecialBill"
            label="是否特殊"
            :formatter="getRowType"
            width="200">
          </el-table-column>
          <el-table-column
            prop="specialNo"
            label="特殊票据编码"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            :width="150">
            <template slot-scope="scope">
              <el-button type="success" size="mini" circle icon="el-icon-copy-document" @click="copyRow(scope.row)"></el-button>
              <el-button type="primary" size="mini" circle icon="el-icon-edit" @click="editRow(scope.row)"></el-button>
              <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="removeRow(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="drawerFooter">
        <el-button class="drawerBtn" type="primary" icon="el-icon-check" @click="sureSub">确定提交</el-button>
      </div>
    </div>
    <drawer-detail
      :sivisible="drawersVisible"
      :dgdata="drawersData"
      :title="drawersTitle"
      :invoicetp="invoiceTypeArr"
      :isdetailjun="isDetailJudueArr"
      :isenable="isEnableArr"
      :orselection="exclusionOrSelectionArr"
      :taxcal="taxCalMethodArr"
      :specialbill="isSpecialBillArr"
      @handleClose="drawerClose"
      @handleSure="sureDetailSub"></drawer-detail>
  </el-drawer>
</template>

<script>
import drawerDetail from './drawerDetail'
export default {
  name: 'ReceRowDrawer',
  components: {drawerDetail},
  props: ['drawer', 'formData', 'drawerTitle'],
  watch: {
    drawer (newValue) {
      this.selfDrawer = newValue
      if (newValue === false) {
        this.initTable()
      }
    },
    drawerTitle (newVal) {
      this.title = newVal
    },
    formData: {
      handler (val, oldVal) {
        this.rolesForm = JSON.parse(JSON.stringify(val))
        if (JSON.stringify(val) === '{}') {
          this.tableData = []
        } else {
          this.getTableData(val.id)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      direction: 'btt',
      selfDrawer: this.drawer,
      rolesForm: JSON.parse(JSON.stringify(this.formData)),
      title: this.drawerTitle,
      tableData: [],
      loading: false,
      selectArray: [],
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
      isDetailJudueArr: [ // 有无明细
        {code: '1', title: '有明细'},
        {code: '2', title: '无明细'}
      ],
      isEnableArr: [ // 是否启用
        {code: '1', title: '启用'},
        {code: '2', title: '停用'}
      ],
      exclusionOrSelectionArr: [ // 排除/选取
        {code: '1', title: '排除'},
        {code: '2', title: '选取'},
        {code: '3', title: '不排除不选取'}
      ],
      taxCalMethodArr: [ // 税额计算方式
        {code: '1', title: '取票面税额'},
        {code: '2', title: '通过税率计算'}
      ],
      isSpecialBillArr: [ // 是否特殊
        {code: '1', title: '非特殊票据'},
        {code: '2', title: '特殊票据'}
      ],
      drawersVisible: false,
      drawersData: {},
      drawersTitle: ''
    }
  },
  methods: {
    handleClose (done) { // 关闭
      done()
      this.close()
    },
    close () { // 关闭
      this.selfDrawer = false
      this.$emit('handleClose')
    },
    getTableData (mid) { // 获取规则subs列表
      let _this = this
      _this.loading = true
      let param = {
        id: mid
      }
      _this.axios.post(_this.$ihttp + '/rule/queryByEntity', param).then(
        res => {
          if (res.data.data && res.data.data.subs) {
            _this.tableData = res.data.data.subs
          } else {
            _this.$message({
              message: '规则暂无内容',
              type: 'info'
            })
          }
          _this.loading = false
        }).catch(rev => {
        _this.loading = false
        _this.$message({
          message: '获取规则subs列表通信失败',
          type: 'error'
        })
      })
    },
    getRowType (row, column) {
      let result = ''
      let val = row[column.property]
      let arr = this._data[column.property + 'Arr']
      for (let item of arr) {
        // eslint-disable-next-line eqeqeq
        if (item.code == val) {
          result = item.title
          break
        }
      }
      return result
    },
    initTable () {
      this.getTableData(this.rolesForm.id)
    },
    handleSelectionChange (val) {
      console.log(val)
      this.selectArray = val
    },
    addRow () {
      this.drawersTitle = '新增行项目'
      this.drawersData = {}
      this.drawersData['editType'] = 'add'
      this.drawersVisible = true
    },
    editRow (row) { // 编辑行
      this.drawersTitle = '编辑行项目'
      this.drawersData = JSON.parse(JSON.stringify(row))
      this.drawersData['editType'] = 'edit'
      this.drawersVisible = true
    },
    copyRow (row) { // 复制行
      this.drawersTitle = '复制行项目'
      this.drawersData = JSON.parse(JSON.stringify(row))
      this.drawersData['editType'] = 'add'
      this.drawersData.id = ''
      this.drawersVisible = true
    },
    removeRow (row) { // 删除行
      let _this = this
      _this.$confirm('是否删除该行记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = _this.tableData.indexOf(row)
        _this.tableData.splice(index, 1)
      }).catch((rev) => {
        console.log(rev)
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sureSub () { // 底部弹窗确认提交
      let _this = this
      _this.loading = false
      _this.$refs.rolesForm.validate((valid) => {
        if (valid) {
          _this.rolesForm['subs'] = _this.tableData
          console.log(_this.rolesForm)
          _this.close()
          _this.axios.post(_this.$ihttp + '/rule/save', _this.rolesForm).then(
            res => {
              if (res.data.data) {
                _this.$emit('refTBSub')
                _this.close()
              } else {
                _this.$message({
                  message: '提交失败',
                  type: 'info'
                })
              }
              _this.loading = false
            }).catch(rev => {
            _this.$message({
              message: '请求提交失败',
              type: 'error'
            })
          })
        } else {
          _this.$message({
            type: 'error',
            message: '提交失败'
          })
          return false
        }
      })
    },
    drawerClose () {
      this.drawersVisible = false
    },
    sureDetailSub (form) { // 弹窗提交
      console.log(form)
      if (form.editType === 'add') {
        this.tableData.push(form)
      } else {
        let arr = JSON.parse(JSON.stringify(this.tableData))
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === form.id) {
            arr[i] = form
            break
          }
        }
        this.tableData = arr
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .drawerContent
    height:570px
    overflow-y:auto
    padding:0px
  .drawerTable
    padding 10px 20px
    height calc(100% - 189px)
  .tableOpera
    text-align right
    margin-top 20px
    padding-right 20px!important
  .drawerFooter
    width 100%
    margin-top 0px
    text-align right
    .drawerBtn
      border-radius 0px
      height 45px
      width 100%
</style>
