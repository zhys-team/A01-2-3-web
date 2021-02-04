<template>
  <div class="businessSet">
    <tree-table
      ref="treeTable"
      :option="tableSetting"
      @handleEditTr="editTr"
      @handleAddTr="addTr"
      @handleRemoveTr="removeTr"
    ></tree-table>
  </div>
</template>

<script>
  import treeTable from '@/base/treeTable/treeTable'
  export default {
    name: 'ExpenseCategory',
    components: { treeTable },
    data() {
      return {
        tableSetting: {
          tableHttpUrl: this.$ihttp + '/businessMatters/queryList', // 请求路径
          isSearch: { searchProp: 'name', placeholder: '请输入 业务事项名称' }, // 搜索框字段设置。
          showOpera: true, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          loadType: 'noAjax', // load方式，noajax：表示非足部请求
          th: [
            // 表哥表头设置
            {
              prop: 'no', // 字段名
              label: '业务事项编码', // 显示名称
              width: '300', // 宽度
              isfixed: false, // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'name',
              label: '业务事项名称',
              minwidth: '300',
              isfixed: false,
            },
            {
              prop: 'icon',
              label: '图标编码',
              minwidth: '200',
              isfixed: false,
            },
            {
              prop: 'isLast',
              label: '是否最末级',
              width: '100',
              isfixed: false,
              formatter: (row, column) => {
                let result = ''
                switch (row.isLast) {
                  case '0':
                    result = '是'
                    break
                  case '1':
                    result = '否'
                    break
                }
                return result
              },
            },
          ], // 表头设置参数
          httpData: {}, // 请求初始参数
          detailViews: {
            // 详情视图设置
            input: [
              // input 内容
              {
                label: '业务事项名称',
                placeholder: '',
                pro: 'name',
                disabled: false,
              },
              {
                label: '业务事项编码',
                placeholder: '',
                pro: 'no',
                disabled: false,
              },
              {
                label: '图标编码',
                placeholder: '',
                pro: 'icon',
                disabled: false,
              },
            ],
            // cascader: [],cascader内容
            radio: [
              // radio内容
              {
                label: '是否最末级',
                pro: 'isLast',
                options: [
                  { label: '1', name: '否' },
                  { label: '0', name: '是' },
                ],
              },
            ],
          },
          operaList: { add: true, edit: true, remove: true },
        },
        multipleSelection: [], // 勾选行集合
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      editTr(param) {
        let _this = this
        console.log(param)
        if (!param.name || param.name === '') {
          _this.$message({
            message: '请填写业务事项名称！',
            type: 'warning',
          })
          return false
        }
        if (!param.no || param.no === '') {
          _this.$message({
            message: '请填写业务事项编码！',
            type: 'warning',
          })
          return false
        }
        if (!param.icon || param.icon === '') {
          _this.$message({
            message: '请填写图标编码！',
            type: 'warning',
          })
          return false
        }
        if (!param.isLast || param.isLast === '') {
          _this.$message({
            message: '请选择是否最末级！',
            type: 'warning',
          })
          return false
        }
        _this.axios
          .post(this.$ihttp + '/businessMatters/save', param)
          .then((res) => {
            if (res.data.code === 1) {
              _this.$message({
                message: '修改成功',
                type: 'success',
              })
              this.$refs.treeTable.initTable(param.id)
            } else {
              _this.$message({
                message: '修改失败',
                type: 'error',
              })
            }
          })
          .catch((rev) => {
            console.log(rev)
            _this.$message({
              message: '修改请求失败',
              type: 'error',
            })
          })
      },
      addTr(param) {
        let _this = this
        console.log(param)
        if (!param.name || param.name === '') {
          _this.$message({
            message: '请填写业务事项名称！',
            type: 'warning',
          })
          return false
        }
        if (!param.no || param.no === '') {
          _this.$message({
            message: '请填写业务事项编码！',
            type: 'warning',
          })
          return false
        }
        if (!param.icon || param.icon === '') {
          _this.$message({
            message: '请填写图标编码！',
            type: 'warning',
          })
          return false
        }
        if (!param.isLast || param.isLast === '') {
          _this.$message({
            message: '请选择是否最末级！',
            type: 'warning',
          })
          return false
        }
        _this.axios
          .post(this.$ihttp + '/businessMatters/save', param)
          .then((res) => {
            if (res.data.code === 1) {
              _this.$message({
                message: '新增成功',
                type: 'success',
              })
              this.$refs.treeTable.initTable(param.parentId)
            } else {
              _this.$message({
                message: '新增失败',
                type: 'error',
              })
            }
          })
          .catch((rev) => {
            console.log(rev)
            _this.$message({
              message: '新增请求失败',
              type: 'error',
            })
          })
      },
      removeTr(row) {
        let _this = this
        _this
          .$confirm('是否删除：' + row.name + '的费用事项及其子项？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            _this.axios
              .get(this.$ihttp + '/businessMatters/state/' + row.id)
              .then((res) => {
                if (res.data.code === 1) {
                  _this.$message({
                    message: '删除成功',
                    type: 'success',
                  })
                  console.log(this.$refs.treeTable)
                  this.$refs.treeTable.initTable(row.id)
                } else {
                  _this.$message({
                    message: '删除失败',
                    type: 'error',
                  })
                }
              })
              .catch((rev) => {
                console.log(rev)
                _this.$message({
                  message: '删除请求失败',
                  type: 'error',
                })
              })
            _this.$refs.treeTable.initTable()
          })
          .catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
    },
  }
</script>

<style scoped>
  .businessSet {
    height: 100%;
  }
</style>
