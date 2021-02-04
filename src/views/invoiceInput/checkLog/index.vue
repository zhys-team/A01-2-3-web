<template>
  <div class="check-log">
    <!--操作栏-->
    <el-row class="operaBar">
      <el-col :span="6" v-if="tableSetting.isSearch">
        <el-input
          :placeholder="tableSetting.isSearch.placeholder"
          v-model="searchVal"
          class="barSearch"
          @keydown.enter.native="tableSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="tableSearch"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-tooltip
          class="item"
          effect="dark"
          content="重置刷新"
          placement="top-start"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh"
            @click="refreshTable"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--表格插件-->
    <base-table
      class="baseTable"
      ref="baseTable"
      :option="tableSetting"
      :httpurl="httpUrl"
    ></base-table>
  </div>
</template>

<script>
  import BaseTable from '@/base/table/table'
  export default {
    name: 'CheckLog',
    components: { BaseTable },
    data() {
      return {
        httpUrl: this.$ihttp + '/validateRecords/page', // 请求路径
        tableSetting: {
          checkBox: false,
          isSearch: {
            searchProp: 'queryString1',
            placeholder: '请输入 发票代码/发票号码',
          }, // 搜索框字段设置。
          tbstyle: 'width: 100%', // 列表的样式
          showPagination: true, // 是否显示分页
          currentPage: 1, // 当前页码
          pageSizes: [20, 50, 100], // 每页显示集合
          pageSize: 20, // 当前 每页显示数量
          total: 1, // 总数据
          th: [
            // 表哥表头设置
            {
              prop: 'fphm', // 字段名
              label: '发票号码', // 显示名称
              width: '200', // 宽度
              isfixed: 'left', // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'fpdm',
              label: '发票代码',
              width: '250',
              isfixed: 'left',
            },
            {
              prop: 'createTime',
              label: '查验日期',
              width: '260',
              isfixed: false,
            },
            {
              prop: 'validateResult',
              label: '查验状态',
              width: '200',
              isfixed: 'right',
              align: 'left',
            },
            {
              prop: 'reason',
              label: '原因',
              maxWidth: '200',
              isfixed: 'right',
              align: 'left',
            },
            {
              prop: 'createMan',
              label: '提交人',
              width: '100',
              isfixed: false,
            },
          ], // 表头设置参数
          tableData: [],
          httpData: {}, // 请求初始参数
        },
        searchVal: '',
      }
    },
    methods: {
      tableSearch() {
        let p = this.searchVal.replace(/\s*/g, '')
        // let s = JSON.parse(JSON.stringify(this.params))
        let s = {
          fphm: p,
        }
        // this.params = s
        // 执行searchTable
        this.$refs.baseTable.searchTable(s)
      },
      refreshTable() {
        // 刷新重置表格
        this.$refs.baseTable.initTable()
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .check-log
    height 100%
  .baseTable
    height calc(100% - 50px)
  .operaBar
    padding 0
    margin-bottom 10px
    width  100%
    .opTbn
      text-align right
  .tab-page
    background-color #fff
    padding 8px 10px
    margin-top 10px
</style>
