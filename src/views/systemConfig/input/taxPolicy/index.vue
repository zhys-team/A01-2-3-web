<template>
  <div class="costInvoice">
    <roles-table
      :option="tableSetting"
      @selectChange="handleSelectionChange"
      @operaFun="handleOpera"
    ></roles-table>
  </div>
</template>

<script>
  import rolesTable from './rolesTable/rolesTable'
  export default {
    components: { rolesTable },
    name: 'TaxPolicy',
    data() {
      return {
        tableSetting: {
          isSearch: { searchProp: 'name', placeholder: '请输入 规则名称' }, // 搜索框字段设置。
          checkBox: false, // 是否有选择框  选择回调事件为selectChange
          checkBoxFixed: true, // 选择框列是否固定
          showOpera: true, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          // operaSetting: [ // 根据type判断是什么类型的事件，type为唯一，color：primary，success，info，warning，danger
          //   // {type: 'edit', color: 'primary', icon: 'el-icon-search'},
          //   // {type: 'delete', color: 'danger', icon: 'el-icon-delete'}
          // ],
          tbstyle: 'width: 100%', // 列表的样式
          isShowSum: false, // 是否显示总计
          showPagination: true, // 是否显示分页
          currentPage: 1, // 当前页码
          pageSizes: [20, 50, 100], // 每页显示集合
          pageSize: 20, // 当前 每页显示数量
          total: 1, // 总数据
          th: [
            // 表哥表头设置
            {
              prop: 'name', // 字段名
              label: '规则名称', // 显示名称
              maxwidth: '120', // 最大宽度
              isfixed: false, // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'code',
              label: '规则编码',
              width: '200',
              isfixed: false,
            },
            {
              prop: 'ruleType',
              label: '规则类型',
              width: '200',
              isfixed: false,
              formatter: (row, column) => {
                console.log(column.property)
                var result = ''
                switch (row.ruleType) {
                  case '1':
                    result = '税务类型'
                    break
                  case '2':
                    result = '发票大类'
                    break
                  case '3':
                    result = '发票业务类型'
                    break
                }
                return result
              },
            },
            {
              prop: 'canDeduct',
              label: '是否可抵',
              width: '150',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.canDeduct) {
                  case '1':
                    result = '可抵'
                    break
                  case '2':
                    result = '不可抵'
                    break
                }
                return result
              },
            },
            {
              prop: 'startDate',
              label: '启用日期',
              width: '200',
              isfixed: false,
            },
            {
              prop: 'endDate',
              label: '停用日期',
              width: '200',
              isfixed: false,
            },
          ], // 表头设置参数
          tableData: [],
          httpData: {}, // 请求初始参数
          seniorSearchSet: {
            // 高级筛选内容设置
            ruleType: [
              { lable: '税务类型', val: '1' },
              { lable: '发票大类', val: '2' },
              { lable: '发票业务类型', val: '3' },
            ],
            canDeduct: [
              { lable: '全部', val: '' },
              { lable: '可抵', val: '1' },
              { lable: '不可抵', val: '2' },
            ],
          },
        },
        multipleSelection: [], // 勾选行集合
      }
    },
    methods: {
      handleSelectionChange(val) {
        // 勾选行
        console.log(val)
        this.multipleSelection = val
      },
      handleOpera(obj) {
        // 其他行操作按钮接口暂时不用自定义
        console.log(obj.type)
        console.log(obj.trIndex)
        console.log(obj.row)
        console.log(obj.data)
        console.log(obj.opIndex)
        switch (obj.type) {
          case 'delete':
            this.deleteRow()
            break
          case 'edit':
            this.handleEdit(obj.trIndex, obj.row)
            break
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .costInvoice
    height 100%
</style>
